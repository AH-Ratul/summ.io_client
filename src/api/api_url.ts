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
  getProductQuery: (query: string) =>
    `/product?search=${encodeURIComponent(query)}`,

  deleteProduct: (id: string) => `/product/${id}`,

  // sales
  addSales: `/sales/create`,
  getSales: `/sales/`,

  // category
  addCategory: `/expense/category/add`,
  getCategory: `/expense/category/`,
  updateCategory: (id: string) => `/expense/category/${id}`,
  deleteCategory: (id: string) => `/expense/category/${id}`,

  // expense
  addExpense: `/expense/addExpense`,
  getExpense: `/expense/`,
  updateExpense: (id: string) => `/expense/${id}`,
  deleteExpense: (id: string) => `/expense/${id}`,
};
