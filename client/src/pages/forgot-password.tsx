import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api";

export type PasswordEmailParams = {
  email: string;
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [input, setInput] = useState<PasswordEmailParams>({
    email: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const isDisabled = Number(input.email.length) === 0;

  const {
    mutate: sendPasswordReset,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <main className="h-screen w-screen bg-gray-100">
      <div className="size-full flex justify-center">
        <div className="max-w-sm w-full h-full flex justify-center items-center ">
          <div className="border-gray-100 w-full rounded-md h-auto shadow py-8 px-7 bg-white mx-3">
            <div className="grid gap-y-3">
              <h2 className="text-xl font-semibold">Reset your password </h2>
              {/* {isError && (
                <p className="text-red-500 text-sm text-center">
                  {(isError && error.message) || "An error occured"}
                </p>
              )} */}
              {isSuccess ? (
                <div>
                  <h2>Email send successfully</h2>
                </div>
              ) : (
                <>
                  <div className="grid gap-y-1">
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

                  <button
                    type="submit"
                    disabled={isDisabled}
                    onClick={() =>
                      sendPasswordReset({
                        email: input.email,
                      })
                    }
                    className={`w-full mt-2 cursor-pointer bg-blue-500 transition-colors hover:bg-blue-600 h-10 text-white px-2 rounded disabled:hover:bg-blue-500 disabled:cursor-default ${
                      isDisabled ? "opacity-25" : ""
                    } `}
                  >
                    Submit
                  </button>

                  <p className="text-sm text-center">
                    Go back to{" "}
                    <Link
                      type="button"
                      className="text-blue-500 hover:underline"
                      to="/login"
                    >
                      Sign in
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
