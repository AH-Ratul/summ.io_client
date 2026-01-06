import { axiosInstance } from "@/src/lib/axios";
import { apiUrl } from "../api_url";

export const getDashboardData = async () => {
  const { data } = await axiosInstance.get(apiUrl.getDashboardData);

  return data;
};

export const getBarChartData = async () => {
  const { data } = await axiosInstance.get(apiUrl.getBarchartData);

  return data;
};
