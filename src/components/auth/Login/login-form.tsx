"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form>
      <div>
        <label htmlFor="email" className="font-semibold text-sm">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="@: ahr@e.com"
          className="w-full block border border-gray-200 focus:ring-1 focus:ring-primary focus:outline-none px-3 py-2 rounded-lg text-sm my-1 shadow-xs"
        />
      </div>

      <div className="mt-3">
        <label htmlFor="password" className="font-semibold text-sm">
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="@: xxxxxxxx"
            className="w-full block border border-gray-200 focus:ring-1 focus:ring-primary  focus:outline-none px-3 py-2 rounded-lg text-sm  my-1 shadow-xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 inset-y-0 pr-3 cursor-pointer flex items-center outline-none"
            aria-label={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? (
              <EyeOff height={20} width={20} />
            ) : (
              <Eye height={20} width={20} />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary text-white text-sm w-full rounded-lg py-1.5 mt-4 cursor-pointer hover:opacity-95 "
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
