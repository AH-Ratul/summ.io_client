import { axiosInstance } from "@/src/lib/axios";
import { apiUrl } from "../api_url";

export const getMe = async () => {
  const { data } = await axiosInstance.get(apiUrl.getMe);
  return data;
};
