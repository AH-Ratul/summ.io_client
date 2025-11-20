import { axiosInstance } from "@/lib/axios";
import { apiUrl } from "../api_url";

export const addSales = async (payload: Object) => {
  const { data } = await axiosInstance.post(apiUrl.addSales, payload);

  return data;
};

export const getSales = async () => {
  const { data } = await axiosInstance.get(apiUrl.getSales);

  return data;
};
