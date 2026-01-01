import { axiosInstance } from "@/src/lib/axios";
import { apiUrl } from "../api_url";

export const addSales = async (payload: Object) => {
  const { data } = await axiosInstance.post(apiUrl.addSales, payload);

  return data;
};

export const getSales = async ({ page, limit, range }: any) => {
  const { data } = await axiosInstance.get(apiUrl.getSales, {
    params: {
      page,
      limit,
      range,
    },
  });

  return data;
};
