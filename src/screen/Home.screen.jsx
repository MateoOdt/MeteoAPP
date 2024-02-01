import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAddressesByQuery } from "../../services/address/addressService";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [weather, setWeather] = useState({});
  const [address, setAddress] = useState("");
  const [addressOptions, setAddressOptions] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (address !== "") {
      getAddressesByQuery(address)
        .then((d) => {
          setAddressOptions(d);
        })
        .catch((err) => console.log(err));
    }
  }, [address]);

  /**
     * useEffect(() => {
      if (selectedAddress !== "") {
        getWeatherByCity(selectedAddress)
          .then((data) => {
            setWeather(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [selectedAddress]);
     */

  console.log(weather);

  const handleSelectAddress = (addressLabel) => {
    setAddress(addressLabel);
    setSelectedAddress(addressLabel);
    setVisible(false);
  };

  const navigateToWeatherScreen = () => {
    navigation.navigate("Weather");
  };

  return (
    <ImageBackground
      source={require("../../assets/imgBackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Button
          title="View Weather"
          onPress={navigateToWeatherScreen}
          mode="contained"
        >
          Geolocalisation
        </Button>
        <Text style={styles.title}>Search for city</Text>
        <TextInput
          label="Address"
          mode="flat"
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            setVisible(true);
          }}
          style={styles.input}
        />
        {addressOptions && visible !== false && (
          <View style={styles.autocompleteContainer}>
            {addressOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleSelectAddress(option.properties.label)}
              >
                <Text style={styles.optionText}>{option.properties.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    padding: 30,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor:
      "linear-gradient(90deg, rgba(64,31,79,1) 0%, rgba(61,41,115,1) 100%)",
  },
  title: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    marginTop: 50,
    width: 270,
  },
  autocompleteContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 20,
  },
  optionText: {
    color: "white",
  },
});

export default HomeScreen;
