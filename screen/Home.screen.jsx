import { Text } from "react-native";
import { useState } from "react";
import { getWeather } from "../service/weather/weatherService";
import { useEffect } from "react";

const HomeScreen = async () => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeather();
      setWeather(data);
    };
    fetchData();
  }, []);
  console.log(weather);

  return <Text>AAAAA</Text>;
};

export default HomeScreen;
