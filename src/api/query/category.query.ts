import { axiosInstance } from "@/lib/axios";
import { apiUrl } from "../api_url";

export const addCategory = async (payload: Object) => {
  const { data } = await axiosInstance.post(apiUrl.addCategory, payload);

  return data;
};

export const getCategory = async () => {
  const { data } = await axiosInstance.get(apiUrl.getCategory);

  return data;
};

export const deleteCategory = async (id: string) => {
  return await axiosInstance.get(apiUrl.deleteCategory(id));
};
