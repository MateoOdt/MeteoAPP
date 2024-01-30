import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
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
                console.error(`Error getting weather data: ${error.message}`);
            }
        };

        getLocation();
        getWeatherData();
    }, [location, unit]);

    return (
        <View>
            <Button title={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`} onPress={toggleUnit} />
            {loading ? (
                <Text>Chargement...</Text>
            ) : (
                <View>
                    <Text>Météo actuelle à {weather?.name} :</Text>
                    <Text>Température : {weather?.main?.temp} °{unit === 'metric' ? 'C' : 'F'}</Text>
                    <Text>Description : {weather?.weather?.[0]?.description}</Text>
                </View>
            )}
        </View>
    );
};

export default WeatherComponent;
