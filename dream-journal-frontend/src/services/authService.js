
import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  const token = response.data.token;

  if (!token) {
    throw new Error("The server did not return an access token.");
  }

  localStorage.setItem("token", token);

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
