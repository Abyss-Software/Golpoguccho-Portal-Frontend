import axios from "axios";
import storageUtil from "./storage.util";

export const httpClient = axios.create({
  baseURL: "https://golpoguccho-backend.onrender.com",
});

httpClient.interceptors.request.use(
  (config) => {
    const token = storageUtil.getLocalAccessToken();
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
