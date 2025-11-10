"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form>
      <div>
        <label htmlFor="name" className="font-semibold text-primary">
          Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="ahr"
          className="w-full block ring-1 ring-primary focus:outline-none px-3 py-2 rounded-lg text-sm text-gray-700 my-1"
        />
      </div>

      <div>
        <label htmlFor="email" className="font-semibold text-primary">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="ahr@e.com"
          className="w-full block ring-1 ring-primary focus:outline-none px-3 py-2 rounded-lg text-sm text-gray-700 my-1"
        />
      </div>

      <div>
        <label htmlFor="password" className="font-semibold text-primary">
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="w-full block ring-1 ring-primary  focus:outline-none px-3 py-2 rounded-lg text-sm text-gray-700 my-1 "
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
        className="bg-primary text-white w-full rounded-lg py-1 mt-4 cursor-pointer hover:opacity-95 "
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
