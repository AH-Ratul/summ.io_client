import LoginForm from "@/src/components/auth/Login/login-form";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh p-4">
      <div className="bg-whit w-full max-w-sm p-6 rounded-2xl shadow-2xl shadow-primary">
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl text-primary">Login</h1>
        </div>

        {/* login form */}
        <LoginForm />

        <div className="text-center mt-6">
          <p className="text-xs text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-teal-500 font-medium hover:underline"
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
