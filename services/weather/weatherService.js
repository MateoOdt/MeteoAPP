import axios from "axios";
import { API_KEY, BASE_URL } from "@env";

/**
 * API Call => retrieve weather informations by city
 * @param city string
 * @returns Object
 */
const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        q: city,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export { getWeatherByCity };
