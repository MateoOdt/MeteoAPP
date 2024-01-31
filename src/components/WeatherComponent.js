import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeatherComponent = () => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unit, setUnit] = useState('metric');
    const [lastUpdate, setLastUpdate] = useState(null);

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

    const shouldFetchData = () => !lastUpdate || (new Date().getTime() - lastUpdate > 30 * 60 * 1000);

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
            if (location && shouldFetchData()) {
                const apiKey = '42f6c0667e6fa2b0de63ec0aa6b5083d';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=${unit}&appid=${apiKey}`;

                const response = await axios.get(apiUrl);
                setWeather(response.data);
                setLoading(false);

                setLastUpdate(new Date().getTime());
                await AsyncStorage.setItem('lastUpdate', JSON.stringify(lastUpdate));
            }
        } catch (error) {
            // Gérer les erreurs
        }
    };

    const loadLastUpdate = async () => {
        try {
            const storedLastUpdate = await AsyncStorage.getItem('lastUpdate');
            if (storedLastUpdate) {
                setLastUpdate(JSON.parse(storedLastUpdate));
            }
        } catch (error) {
            console.error('Error loading last update from AsyncStorage:', error.message);
        }
    };

    useEffect(() => {
        getLocation();
        loadLastUpdate();
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
