import axios from "axios";

export const fetchData = async (userId, password, url) => {
  try {
    const response = await axios.post("http://localhost:5004/api/data", {
      userId,
      password,
      url,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
