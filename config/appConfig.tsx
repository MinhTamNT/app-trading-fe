import axios from "axios";

const baseURL = "http://10.10.93.13:5000";

export const endPoints = {
  register: "/api/register",
  login: "/api/login",
  "current-user": "/api/current-user",
  "get-recommend": "/api/stock/recommendations",
};

export const AUTHAPI = (token: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${token}` }, // Use backticks for template literals
  });
};
export const API = () =>
  axios.create({
    baseURL: baseURL,
  });
