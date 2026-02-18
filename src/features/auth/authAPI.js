import axios from "axios";

export const loginUserAPI = async (credentials) => {
  const response = await axios.post(
    "https://dummyjson.com/auth/login",
    credentials
  );
  return response.data;
};
