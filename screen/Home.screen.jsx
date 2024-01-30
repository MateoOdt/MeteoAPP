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

  return <Text>Welcome on dev</Text>;
};

export default HomeScreen;
