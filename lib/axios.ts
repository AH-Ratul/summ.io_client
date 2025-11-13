import axios from "axios";
import { SERVER_URL } from "@/src/api/api_url";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
