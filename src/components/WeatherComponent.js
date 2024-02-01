import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
            'clear sky': require('../assets/01d.png'),
            'few clouds': require('../assets/02d.png'),
            'scattered clouds': require('../assets/03d.png'),
            'broken clouds': require('../assets/04d.png'),
            'overcast clouds': require('../assets/04d.png'),
            'shower rain': require('../assets/09d.png'),
            'light intensity drizzle': require('../assets/09d.png'),
            'drizzle': require('../assets/09d.png'),
            'heavy intensity drizzle': require('../assets/09d.png'),
            'light intensity drizzle rain': require('../assets/09d.png'),
            'drizzle rain': require('../assets/09d.png'),
            'heavy intensity drizzle rain': require('../assets/09d.png'),
            'shower rain and drizzle': require('../assets/09d.png'),
            'heavy shower rain and drizzle': require('../assets/09d.png'),
            'shower drizzle': require('../assets/09d.png'),
            'light intensity shower rain': require('../assets/09d.png'),
            'heavy intensity shower rain': require('../assets/09d.png'),
            'ragged shower rain': require('../assets/09d.png'),
            'rain': require('../assets/10d.png'),
            'light rain': require('../assets/10d.png'),
            'moderate rain': require('../assets/10d.png'),
            'heavy intensity rain': require('../assets/10d.png'),
            'very heavy rain': require('../assets/10d.png'),
            'extreme rain': require('../assets/10d.png'),
            'thunderstorm': require('../assets/11d.png'),
            'thunderstorm with light rain': require('../assets/11d.png'),
            'thunderstorm with rain': require('../assets/11d.png'),
            'thunderstorm with heavy rain': require('../assets/11d.png'),
            'light thunderstorm': require('../assets/11d.png'),
            'heavy thunderstorm': require('../assets/11d.png'),
            'ragged thunderstorm': require('../assets/11d.png'),
            'thunderstorm with light drizzle': require('../assets/11d.png'),
            'thunderstorm with drizzle': require('../assets/11d.png'),
            'thunderstorm with heavy drizzle': require('../assets/11d.png'),
            'snow': require('../assets/13d.png'),
            'freezing rain': require('../assets/13d.png'),
            'light snow': require('../assets/13d.png'),
            'heavy snow': require('../assets/13d.png'),
            'sleet': require('../assets/13d.png'),
            'light shower sleet': require('../assets/13d.png'),
            'shower sleet': require('../assets/13d.png'),
            'light rain and snow': require('../assets/13d.png'),
            'rain and snow': require('../assets/13d.png'),
            'light shower snow': require('../assets/13d.png'),
            'shower snow': require('../assets/13d.png'),
            'heavy shower snow': require('../assets/13d.png'),
            'mist': require('../assets/50d.png'),
            'smoke': require('../assets/50d.png'),
            'haze': require('../assets/50d.png'),
            'sand/dust whirls': require('../assets/50d.png'),
            'fog': require('../assets/50d.png'),
            'sand': require('../assets/50d.png'),
            'dust': require('../assets/50d.png'),
            'volcanic ash': require('../assets/50d.png'),
            'squalls': require('../assets/50d.png'),
            'tornado': require('../assets/50d.png'),
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
            <Text style={styles.city}>{weather?.name}</Text>
            {loading ? (
                <Text style={styles.loadingText}>Chargement...</Text>
            ) : (
                <View style={styles.weatherContainer}>
                    <Text style={styles.weather}>{weather?.weather?.[0]?.description}</Text>
                    <TouchableOpacity onPress={toggleUnit}>
                        <Image source={getWeatherImage(weather?.weather?.[0]?.description)} style={styles.weatherImage} />
                    </TouchableOpacity>
                    <Text style={styles.temperature} onPress={toggleUnit}>
                        Température : {weather?.main?.temp} °{unit === 'metric' ? 'C' : 'F'}
                    </Text>
                    <Text style={styles.date}>{new Date().toLocaleString()}</Text>
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
        backgroundColor: "#ffffff",
    },
    loadingText: {
        fontSize: 18,
        marginTop: 20,
    },
    city: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    weatherContainer: {
        alignItems: 'center',
    },
    weather: {
        fontSize: 18,
        marginBottom: 10,
    },
    temperature: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    weatherImage: {
        width: 80,
        height: 80,
        marginTop: 10,
    },
    date: {
        fontSize: 16,
    },
    // ... Ajoutez d'autres styles si nécessaire
});

export default WeatherComponent;
