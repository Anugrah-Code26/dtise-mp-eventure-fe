import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const getEventCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/category`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching event categories:", error);
    throw error;
  }
};

export const getCities = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/geo/city`, {
      params: { query },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
