import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getWeatherByCity } from "../services/weather/weatherService";

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

  console.log(weather);

  return (
    <View>
      <Text>city name : {weather?.name ?? "No city"}</Text>
      <Text>wind speed : {weather?.wind?.speed ?? "No info"}</Text>
    </View>
  );
};

export default HomeScreen;
