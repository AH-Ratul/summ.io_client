import RegisterForm from "@/components/auth/register/register-form";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh p-4">
      <div className="bg-whit w-full max-w-md p-6 rounded-2xl shadow-sm shadow-primary/40">
        <div className="mb-5 text-start">
          <h1 className="font-bold text-xl text-primary">
            Create Your Account
          </h1>
          <p className="text-sm font-semibold my-1.5 text-gray-500">
            Please provide your information
          </p>
        </div>

        {/* register form */}
        <RegisterForm />

        <div className="text-center mt-5">
          <p className="text-xs text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
