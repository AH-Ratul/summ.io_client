import { axiosInstance } from "@/lib/axios";
import { apiUrl } from "../api_url";

export const createUser = async (payload: Object) => {
  const { data } = await axiosInstance.post(apiUrl.createUser, payload);
  return data;
};

export const logoutUser = () => {
  return axiosInstance.post(apiUrl.logout);
};
