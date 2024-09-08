// src/pages/AuthPage.tsx
"use client";

import Image from "next/image";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import Apple from "../../../public/icons/apple.svg";
import Google from "../../../public/icons/google.svg";
import api from "../../lib/api"; // Ensure you have your API module correctly configured
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth(); // Access the setUser function

  const toggleView = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Normalize userType if present
    if (data.userType) {
      data.userType = (data.userType as string).toLowerCase();
    }

    try {
      let response;
      if (isSignIn) {
        response = await api.post("/auth/login", data);
        toast.success("Signed in successfully!");

        // Set the user in the context
        setUser(response.data.data);
        console.log(response.data.data);

        // Set token and id cookies with additional parameters
        document.cookie = `token=${response.data.data.token}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `id=${response.data.data.id}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

        // Redirect based on userType
        router.push("/dashboard");
      } else {
        response = await api.post("/auth/register", data);
        toast.success("Account created successfully!");

        setIsSignIn(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle AxiosError
        const errorMessage = error.response?.data?.message || error.message;
        console.error(
          "Submission Error:",
          error.response?.data || error.message
        );
        toast.error(`Error: ${errorMessage}`);
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const signInFields = [
    {
      id: "signin-email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
    },
    {
      id: "signin-password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
    },
  ];

  const newAccountFields = [
    {
      id: "first-name",
      name: "firstName",
      type: "text",
      placeholder: "Enter your first name",
      label: "First name",
    },
    {
      id: "last-name",
      name: "lastName",
      type: "text",
      placeholder: "Enter your last name",
      label: "Last name",
    },
    {
      id: "signup-email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
    },
    {
      id: "signup-password",
      name: "password",
      type: "password",
      placeholder: "Create password",
      label: "Password",
    },
  ];

  const accountTypes = [
    { id: "account-type-individual", value: "Individual", label: "Individual" },
    {
      id: "account-type-property-owner",
      value: "Property Owner",
      label: "Property Owner",
    },
    { id: "account-type-agent", value: "Agent", label: "Agent" },
    {
      id: "account-type-property-developer",
      value: "Property Developer",
      label: "Property Developer",
    },
  ];

  return (
    <div className="relative flex w-full">
      <ToastContainer />
      <div
        className="sticky top-0 hidden w-1/2 h-screen bg-center bg-no-repeat bg-cover md:flex"
        style={{ backgroundImage: `url('/images/sign-in.png')` }}
      ></div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <div className="flex flex-col gap-7 px-[65px] pt-[62px] pb-[8.75rem] text-center md:px-[7.125rem] md:pt-9">
          <h1 className="text-2xl font-bold">Welcome To Housinn</h1>
          <div className="flex justify-center w-full px-[13px]">
            <button
              className={`px-8 py-2 text-[14px] border-b-2 focus:outline-none ${
                isSignIn ? "border-primary" : "border-white-300"
              }`}
              onClick={toggleView}
            >
              Sign in
            </button>
            <button
              className={`px-6 py-2 text-[14px] border-b-2 focus:outline-none ${
                !isSignIn ? "border-primary" : "border-white-300"
              }`}
              onClick={toggleView}
            >
              New Account
            </button>
          </div>
          <form
            className="px-[13px] flex flex-col w-full"
            onSubmit={handleSubmit}
          >
            {isSignIn ? (
              signInFields.map((field) => (
                <div key={field.id} className="mb-3 text-left">
                  <label
                    htmlFor={field.id}
                    className="text-[14px] font-semibold"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-2 py-2 placeholder:text-[14px] border border-white-300 rounded focus:outline-none"
                  />
                </div>
              ))
            ) : (
              <>
                {newAccountFields.map((field) => (
                  <div key={field.id} className="mb-3 text-left">
                    <label
                      htmlFor={field.id}
                      className="text-[14px] font-semibold"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-2 py-2 placeholder:text-[14px] border border-white-300 rounded focus:outline-none"
                    />
                  </div>
                ))}
                <div className="pt-3">
                  <p className="text-[14px] font-semibold">Account Type</p>
                  <div className="grid grid-cols-2 grid-rows-2 mt-2">
                    {accountTypes.map((type) => (
                      <label
                        key={type.id}
                        className="flex items-center gap-1 text-[14px]"
                      >
                        <input
                          type="radio"
                          id={type.id}
                          name="userType"
                          value={type.value}
                        />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
            <button
              className="w-full py-2 mt-8 mb-4 text-base text-white bg-primary rounded"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : isSignIn ? (
                "Sign in"
              ) : (
                "Create Account"
              )}
            </button>
            {isSignIn && (
              <div className="mb-2 text-center">
                <a href="#" className="text-[14px] text-primary">
                  Forgot your password?
                </a>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-white-300">
              <div className="flex-1 border-[1px] border-white-300"></div>
              or
              <div className="flex-1 border-[1px] border-white-300"></div>
            </div>
            <div className="flex flex-col w-full gap-[14px] pt-3">
              <div className="flex items-center justify-between px-[7.6px] py-[6px] pr-[30px] border-[1px] rounded-[5px]">
                <Image
                  src={Google}
                  width={30}
                  height={30}
                  alt="Sign in with Google"
                />
                <p className="text-[14px] font-semibold">Sign in with Google</p>
              </div>
              <div className="flex items-center justify-between px-[7.6px] py-[6px] pr-[34px] border-[1px] rounded-[5px]">
                <Image
                  src={Apple}
                  width={30}
                  height={30}
                  alt="Sign in with Apple"
                />
                <p className="text-[14px] font-semibold">Sign in with Apple</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
