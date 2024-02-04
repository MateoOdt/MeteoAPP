import axios from "axios";
import { API_KEY, BASE_URL } from "@env";

/**
 * API Call => retrieve weather informations by city
 * @param city string
 * @returns Object
 */
const getWeatherByCity = async (city, metric) => {
  try {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        q: city,
        units: metric,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

/**
 * Récupère les informations météorologiques par coordonnées géographiques
 * @param {number} latitude Latitude
 * @param {number} longitude Longitude
 * @returns {Promise<Object>}
 */
const getWeatherByCoordinates = async (latitude, longitude, metric) => {
  try {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        units: metric,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données météorologiques :",
      error
    );
    throw error;
  }
};

export { getWeatherByCity, getWeatherByCoordinates };
