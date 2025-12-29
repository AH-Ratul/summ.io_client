import LoginForm from "@/src/components/auth/Login/login-form";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh p-4">
      <div className="bg-whit w-full max-w-md p-6 rounded-2xl shadow-sm shadow-primary/40">
        <div className="mb-6 text-center">
          <h1 className="font-extrabold text-xl ">
            Welcome to <span className="text-primary">Summ.io</span>
          </h1>
          <p className="text-sm font-semibold mt-1.5 text-gray-500">
            Please provide your credentials
          </p>
        </div>

        {/* login form */}
        <LoginForm />

        <div className="text-center mt-6">
          <p className="text-xs text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
