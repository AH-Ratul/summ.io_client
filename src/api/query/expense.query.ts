import { axiosInstance } from "@/lib/axios";
import { apiUrl } from "../api_url";

export const addExpense = async (payload: Object) => {
  const { data } = await axiosInstance.post(apiUrl.addExpense, payload);

  return data;
};

export const getExpense = async () => {
  const { data } = await axiosInstance.get(apiUrl.getExpense);

  return data;
};

export const updateExpense = async (id: string) => {
  const { data } = await axiosInstance.patch(apiUrl.updateExpense(id));

  return data;
};

export const deleteExpense = async (id: string) => {
  return await axiosInstance.delete(apiUrl.deleteExpense(id));
};
