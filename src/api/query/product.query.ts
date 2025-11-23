import { axiosInstance } from "@/lib/axios";
import { apiUrl } from "../api_url";

export const addProduct = async (payload: Object) => {
  const { data } = await axiosInstance.post(apiUrl.addProduct, payload);
  return data;
};

export const getProduct = async () => {
  const { data } = await axiosInstance.get(apiUrl.getProduct);
  return data;
};

export const getProductQuery = async (query: string) => {
  const { data } = await axiosInstance.get(apiUrl.getProductQuery(query));
  return data;
};

export const deleteProduct = async (id: string) => {
  return await axiosInstance.delete(apiUrl.deleteProduct(id));
};
