import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../lib/api";

export type RegisterParams = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState<RegisterParams>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const isDisabled = Number(input.password.length) < 6;

  const {
    mutate: signUp,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  return (
    <main className="h-screen w-screen bg-gray-100">
      <div className="size-full flex justify-center">
        <div className="max-w-sm w-full h-full flex justify-center items-center ">
          <div className="border-gray-100 w-full rounded-md h-auto shadow py-8 px-7 bg-white mx-3">
            <div className="grid gap-y-3">
              <h2 className="text-xl font-semibold">Register </h2>
              {isError && (
                <p className="text-red-500 text-sm text-center">
                  {/* {error.message} */}
                  Failed to register
                </p>
              )}
              <div className="grid">
                <label htmlFor="email" className="text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  className="rounded border h-10 px-2 placeholder:text-sm"
                />
              </div>
              <div className="grid">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    signUp({
                      email: input.email,
                      password: input.password,
                      confirmPassword: input.confirmPassword,
                    })
                  }
                  className="rounded border h-10 px-2 placeholder:text-sm"
                />
              </div>
              <div className="grid">
                <label htmlFor="confirmPassword" className="text-sm">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Comfirm password"
                  onChange={handleInputChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    signUp({
                      email: input.email,
                      password: input.password,
                      confirmPassword: input.confirmPassword,
                    })
                  }
                  className="rounded border h-10 px-2 placeholder:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isDisabled}
                onClick={() =>
                  signUp({
                    email: input.email,
                    password: input.password,
                    confirmPassword: input.confirmPassword,
                  })
                }
                className={`w-full mt-2 cursor-pointer bg-blue-500 transition-colors hover:bg-blue-600 h-10 text-white px-2 rounded disabled:hover:bg-blue-500 disabled:cursor-default ${
                  isDisabled ? "opacity-25" : ""
                } `}
              >
                Sign Up
              </button>
              <p className="text-sm text-center mt-2">
                Already have account?{" "}
                <Link
                  to={"/login"}
                  className="text-right text-blue-500  hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
