import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getAddressesByQuery } from "../../services/address/addressService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [addressFormatToCity, setAddressFormatToCity] = useState("");
  const [address, setAddress] = useState("");
  const [addressOptions, setAddressOptions] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [favorites, setFavorites] = useState([]);
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

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        try {
          const existingFavorites = await AsyncStorage.getItem("favorites");
          if (existingFavorites !== null) {
            setFavorites(JSON.parse(existingFavorites));
          }
        } catch (error) {
          console.error("Error loading favorites", error);
        }
      };

      loadFavorites();
    }, [])
  );

  const handleSelectAddress = (addressProperties) => {
    setAddress(addressProperties.label);
    setSelectedAddress(addressProperties.label);
    setAddressFormatToCity(addressProperties.city);
    setVisible(false);
  };

  const navigateToWeatherScreenWithGeo = () => {
    navigation.navigate("Weather");
  };

  const navigateToWeatherScreen = () => {
    navigation.navigate("Weather", { paramKey: addressFormatToCity });
  };

  const navigateToWeatherScreenWithFav = (fav) => {
    navigation.navigate("Weather", { paramKey: fav });
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
          onPress={navigateToWeatherScreenWithGeo}
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
                onPress={() => handleSelectAddress(option.properties)}
              >
                <Text style={styles.optionText}>{option.properties.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {selectedAddress !== "" && (
          <Button
            title="View Weather"
            onPress={navigateToWeatherScreen}
            mode="contained"
            style={styles.weatherBtn}
          >
            View Weather
          </Button>
        )}
        {favorites.map((fav) => (
          <TouchableOpacity
            key={fav}
            onPress={() => navigateToWeatherScreenWithFav(fav)}
          >
            <View style={styles.fav}>
              <Text style={styles.favLabel}>{fav}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  weatherBtn: {
    marginTop: 20,
  },
  fav: {
    width: 270,
    height: 40,
    backgroundColor: "rgba(1,1,1, 0.2)",
    borderRadius: 10,
    marginTop: 10,
  },
  favLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 15,
    marginTop: 10,
  },
});

export default HomeScreen;
