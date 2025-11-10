import RegisterForm from "@/src/components/auth/register/register-form";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh p-4">
      <div className="bg-whit w-full max-w-sm p-6 rounded-2xl shadow-2xl shadow-primary">
        <div className="mb-5 text-start">
          <h1 className="font-bold text-2xl text-primary">
            Create Your Account
          </h1>
        </div>

        {/* register form */}
        <RegisterForm />

        <div className="text-center mt-5">
          <p className="text-xs text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-teal-500 font-medium hover:underline"
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
