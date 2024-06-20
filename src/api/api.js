import axios from "axios";

const API_BASE_URL = "http://localhost:5006/api";

export const fetchData = async (userId, password, url) => {
  const response = await axios.post(`${API_BASE_URL}/data`, {
    userId,
    password,
    url,
  });
  return response.data;
};

export const saveConfig = async (config) => {
  const response = await axios.post(`${API_BASE_URL}/config`, config);
  return response.data;
};

export const fetchConfig = async (configName) => {
  const response = await axios.get(`${API_BASE_URL}/config/${configName}`);
  return response.data;
};

// New function to fetch all configuration names
export const fetchConfigNames = async () => {
  const response = await axios.get(`${API_BASE_URL}/configNames`);
  return response.data;
};
