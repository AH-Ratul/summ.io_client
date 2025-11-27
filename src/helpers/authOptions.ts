import { axiosInstance } from "@/lib/axios";
import Credentials from "next-auth/providers/credentials";
import { apiUrl } from "../api/api_url";
import { NextAuthOptions } from "next-auth";
import { config } from "@/lib/config";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
      accessToken?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    accessToken?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  secret: config.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 1 * 24 * 60 * 60 },
  jwt: { maxAge: 1 * 24 * 60 * 60 },
  providers: [
    Credentials({
      name: "credentials",
      credentials: { email: { type: "email" }, password: { type: "password" } },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          console.log("email  or password is missing");
          return null;
        }

        try {
          const { data: userInfo } = await axiosInstance.post(
            apiUrl.credentialsLogin,
            {
              email,
              password,
            }
          );

          const { user, userToken } = userInfo.data;

          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              accessToken: userToken.accessToken,
            };
          }
          return null;
        } catch (error: any) {
          let message = "Invalid Credentials";
          if (error instanceof AxiosError)
            message = error.response?.data.message;
          else if (error instanceof Error) message = error.message;

          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;

        if (token.accessToken) {
          (await cookies()).set("accessToken", token.accessToken as string, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 1 * 24 * 60 * 60,
          });
        }
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (session.user && token) {
        session.user.id = token?.id as string;
        session.user.name = token?.name as string;
        session.user.email = token?.email as string;
        session.user.role = token?.role as string;
        session.user.accessToken = token?.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
};
