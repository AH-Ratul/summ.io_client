"use client";

import { PropsWithChildren } from "react";
import { AuthProvider } from "./auth.provider";
import { QueryProvider } from "./query.provider";
import { Toaster } from "sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthProvider>
        <QueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </AuthProvider>
    </>
  );
};
