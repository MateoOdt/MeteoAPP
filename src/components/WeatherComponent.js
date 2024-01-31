import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const WeatherComponent = () => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

    const toggleUnit = () => {
        setUnit(unit === 'metric' ? 'imperial' : 'metric');
    };

    const getWeatherImage = (weatherDescription) => {
        const iconMapping = {
            'clear sky': '01d.png',
            'few clouds': '02d.png',
            'scattered clouds': '03d.png',
            'broken clouds': '04d.png',
            'shower rain': '09d.png',
            'rain': '10d.png',
            'thunderstorm': '11d.png',
            'snow': '13d.png',
            'mist': '50d.png',
        };

        return iconMapping[weatherDescription.toLowerCase()] || null;
    };

    useEffect(() => {
        const getLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    throw new Error('Permission to access location was denied');
                }

                const locationData = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: locationData.coords.latitude,
                    longitude: locationData.coords.longitude,
                });
            } catch (error) {
                console.error(`Error getting location: ${error.message}`);
            }
        };

        const getWeatherData = async () => {
            try {
                if (location) {
                    const apiKey = '42f6c0667e6fa2b0de63ec0aa6b5083d';
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=${unit}&appid=${apiKey}`;

                    const response = await axios.get(apiUrl);
                    setWeather(response.data);
                    setLoading(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.error('Too many requests. Please try again later.');
                    // Attendre 1 minute avant de réessayer (60000 millisecondes)
                    setTimeout(() => {
                        getWeatherData();
                    }, 60000);
                } else if (error.message.includes('Cannot read property \'toLowerCase\' of undefined')) {
                    // Gérer le cas où la description météorologique est undefined
                    console.error('Error: Weather description is undefined.');
                    setLoading(false);
                } else {
                    console.error(`Error getting weather data: ${error.message}`);
                    setLoading(false);
                }
            }
        };

        getLocation();
        getWeatherData();
    }, [location, unit]);

    return (
        <View style={styles.container}>
            <Button title={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`} onPress={toggleUnit} />
            {loading ? (
                <Text style={styles.loadingText}>Chargement...</Text>
            ) : (
                <View>
                    <Text style={styles.city}>{weather?.name}</Text>
                    <Text style={styles.weather}>{weather?.weather?.[0]?.description}</Text>
                    <Image source={getWeatherImage(weather?.weather?.[0]?.description)} style={styles.weatherImage} />
                    <Text style={styles.temperature}>Température : {weather?.main?.temp} °{unit === 'metric' ? 'C' : 'F'}</Text>
                    {/* ... Autres éléments du composant */}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    loadingText: {
        fontSize: 18,
        marginTop: 20,
    },
    city: {
        fontSize: 24,
        fontWeight: "bold",
    },
    weather: {
        fontSize: 18,
    },
    temperature: {
        fontSize: 20,
        fontWeight: "bold",
    },
    weatherImage: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    // ... Ajoutez d'autres styles si nécessaire
});

export default WeatherComponent;
