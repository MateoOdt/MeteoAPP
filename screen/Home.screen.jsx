import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getWeatherByCity } from "../services/weather/weatherService";
import { TextInput } from "react-native-paper";

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (address !== "") {
      getWeatherByCity(address)
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [address]);

  return (
    <View>
      <Text>Search for city</Text>
      <TextInput
        label="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Text>wind speed : {weather?.wind?.speed ?? "No info"}</Text>
    </View>
  );
};

export default HomeScreen;
