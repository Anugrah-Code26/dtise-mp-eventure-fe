import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const getEventCategories = async () => {
  const response = await axios.get(`${API_URL}/event/categories`);
  return response.data.data;
};

export const searchCities = async (query: string) => {
  const response = await axios.get(`${API_URL}/city`, {
    params: { query },
  });
  return response.data.data;
};
