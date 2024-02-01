import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
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
        <ImageBackground
            source={require('../assets/Background.png')} // Remplacez avec le chemin de votre image de fond
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.city}>{weather?.name}</Text>
                {loading ? (
                    <Text style={styles.loadingText}>Chargement...</Text>
                ) : (
                    <View style={styles.weatherContainer}>
                        <Text style={styles.weather}>{weather?.weather?.[0]?.description}</Text>
                        <Image source={getWeatherImage(weather?.weather?.[0]?.description)} style={styles.weatherImage} />
                        <TouchableOpacity onPress={toggleUnit}>
                            <Text style={styles.temperature}>{weather?.main?.temp} °{unit === 'metric' ? 'C' : 'F'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.date}>{new Date().toLocaleString()}</Text>
                        <View style={styles.otherInfoContainer}>
                            <View style={styles.otherInfo}>
                                <Image source={require('../assets/parapluie.png')} style={styles.infoImage} />
                                <Text>{weather?.rain?.['1h'] || 0} mm</Text>
                                <Text>Précipitation</Text>
                            </View>
                            <View style={styles.otherInfo}>
                                <Image source={require('../assets/goutte.png')} style={styles.infoImage} />
                                <Text>{weather?.main?.humidity} %</Text>
                                <Text>Humidité</Text>
                            </View>
                            <View style={styles.otherInfo}>
                                <Image source={require('../assets/vent.png')} style={styles.infoImage} />
                                <Text>{weather?.wind?.speed} m/s</Text>
                                <Text>Vitesse du vent</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
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
    date: {
        fontSize: 16,
        marginTop: 20,

    },
    otherInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    otherInfo: {
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10,

    },
    infoImage: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});
export default WeatherComponent;
