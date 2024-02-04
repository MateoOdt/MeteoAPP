import axios from "axios";
import { BASE_URL_ADDRESS } from "@env";

const getAddressesByQuery = async (query) => {
  try {
    const response = await axios.get(BASE_URL_ADDRESS, {
      params: {
        q: query,
      },
    });

    return response.data.features;
  } catch (error) {
    console.error("Error fetching address data:", error);
    throw error;
  }
};

export { getAddressesByQuery };
