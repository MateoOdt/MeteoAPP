import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getWeatherByCity } from "../services/weather/weatherService";
import { TextInput } from "react-native-paper";
import { getAddressesByQuery } from "../services/address/addressService";

const HomeScreen = () => {
  const [weather, setWeather] = useState({});
  const [address, setAddress] = useState("");
  const [addressOptions, setAddressOptions] = useState(null);

  useEffect(() => {
    if (address !== "") {
      getAddressesByQuery(address)
        .then((d) => {
          setAddressOptions(d);
        })
        .catch((err) => console.log(err));
    }
  }, [address]);

  useEffect(() => {
    if (addressOptions !== null) {
      getWeatherByCity(addressOptions[0]?.properties?.label)
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [addressOptions]);

  console.log(weather);

  return (
    <View>
      <Text>Search for city</Text>
      <TextInput
        label="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Text>Wind Speed : {weather?.wind?.speed ?? "No info"}</Text>
      <Text>Humidity : {weather?.main?.humidity ?? "No info"}</Text>
      <Text>Weather : {weather?.weather[0]?.description ?? "No info"}</Text>
    </View>
  );
};

export default HomeScreen;
