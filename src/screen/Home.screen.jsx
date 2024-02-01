import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { getWeatherByCity } from "../../services/weather/weatherService";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const [city, setCity] = useState("Paris");
    const [weather, setWeather] = useState(null);
    const navigation = useNavigation();

    const handleSearch = async () => {
        try {
            const data = await getWeatherByCity(city);
            setWeather(data);
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToWeatherScreen = () => {
        navigation.navigate("Weather");
    };

    useEffect(() => {
        handleSearch(); // Charge les données météorologiques pour la ville par défaut (Paris)
    }, []);

    return (
        <View>
            <Text>Search for city</Text>
            <TextInput
                label="City"
                value={city}
                onChangeText={(text) => setCity(text)}
            />
            <Button title="Search" onPress={handleSearch} />
            <Text>wind speed: {weather?.wind?.speed ?? "No info"}</Text>
            <Button title="View Weather" onPress={navigateToWeatherScreen} />
        </View>
    );
};

export default HomeScreen;
