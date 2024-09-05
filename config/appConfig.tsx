import axios from "axios";

const baseURL = "http://10.10.92.189:5000";

export const endPoints = {
  register: "register",
  login: "login",
  "current-user": "current-user",
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
