import axios from "axios";

const baseURL = "http://10.10.92.101:5000";

export const endPoints = {
  register: "/api/register",
  login: "/api/login",
  "current-user": "/api/current-user",
  "get-recommend" : "/api/stock/recommendations"
};

export const AUTHAPI = (token: string) => {
  axios.create({
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const API = () =>
  axios.create({
    baseURL: baseURL,
  });
