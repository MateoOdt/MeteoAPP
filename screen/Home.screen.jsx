import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getWeatherByCity } from "../services/weather/weatherService";
import { TextInput } from "react-native-paper";

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeatherByCity("Paris")
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Text>Search for city</Text>
      <Text>wind speed : {weather?.wind?.speed ?? "No info"}</Text>
    </View>
  );
};

export default HomeScreen;
