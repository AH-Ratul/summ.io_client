import { axiosInstance } from "@/lib/axios";
import { apiUrl } from "../api_url";

export const createUser = async (payload: TCreateUserPayload) => {
  const { data } = await axiosInstance.post(apiUrl.createUser, payload);
  return data;
};

type TCreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "STAFF";
};
