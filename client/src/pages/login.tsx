import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";

export type LoginParams = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState<LoginParams>({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const isDisabled = Number(input.password.length) < 6;

  const {
    mutate: signIn,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <main className="h-screen w-screen bg-gray-100">
      <div className="size-full flex justify-center">
        <div className="max-w-sm w-full h-full flex justify-center items-center ">
          <div className="border-gray-100 w-full rounded-md h-auto shadow py-8 px-7 bg-white mx-3">
            <div className="grid gap-y-3">
              <h2 className="text-xl font-semibold">Login </h2>
              {isError && (
                <p className="text-red-500 text-sm text-center">
                  {/* {error.message} */}
                  Invalid email or passsword
                </p>
              )}
              <div className="grid gap-y-1 ">
                <label htmlFor="email" className="text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  className="rounded border-2 border-gray-200 h-10 px-2 placeholder:text-sm focus:border-blue-500"
                />
              </div>
              <div className="grid gap-y-1">
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
                    signIn({ email: input.email, password: input.password })
                  }
                  className="rounded border-2 border-gray-200 h-10 px-2 placeholder:text-sm focus:border-blue-500"
                />
              </div>
              <Link
                to={"/password/forgot"}
                className="text-right text-blue-500 text-sm hover:underline"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                disabled={isDisabled}
                onClick={() =>
                  signIn({ email: input.email, password: input.password })
                }
                className={`w-full mt-2 cursor-pointer bg-blue-500 transition-colors hover:bg-blue-600 h-10 text-white px-2 rounded disabled:hover:bg-blue-500 disabled:cursor-default ${
                  isDisabled ? "opacity-25" : ""
                } `}
              >
                Sign In
              </button>
              <p className="text-sm text-center mt-2">
                Don't have account?{" "}
                <Link
                  to={"/register"}
                  className="text-right text-blue-500  hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
