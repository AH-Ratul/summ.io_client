export type TLoginFormTypes = {
  email: string;
  password: string;
};

export type TRegisterFormTypes = {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "STAFF";
};
