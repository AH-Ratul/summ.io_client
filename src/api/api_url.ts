import { config } from "@/lib/config";

export const SERVER_URL = config.baseUrl;

export const apiUrl = {
  // auth
  credentialsLogin: `/auth/login`,
  logout: `/auth/logout`,

  // user
  createUser: `/user/register`,

  // product
  addProduct: `/product/create`,
  getProduct: `/product/`,
  deleteProduct: (id: string) => `/product/${id}`,

  // sales
  addSales: `/sales/create`,
  getSales: `/sales/`,
};
