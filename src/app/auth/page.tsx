"use client";
import Image from "next/image";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInFields, newAccountFields, accountTypes } from "@/data/auth";
import Apple from "../../../public/icons/apple.svg";
import Google from "../../../public/icons/google.svg";
import api from "../../lib/api";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { toast } from "sonner";
import { z } from "zod";
import { ZodError } from "zod";
import { Logo } from "../../../public/icons";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

// Validation schemas for sign-in and sign-up
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password can't be more than 20 characters"),
});

const signUpSchema = z
  .object({
    firstName: z.string().nonempty(" Required"),
    lastName: z.string().nonempty("Required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password can't be more than 20 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    userType: z.string().nonempty("Please select an account type"),
    // termsAccepted: z.literal(true, {
    //   errorMap: () => ({ message: "You must accept the terms and conditions" }),
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Store field errors
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleView = () => {
    setIsSignIn(!isSignIn);
    setErrors({}); // Reset errors when toggling
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

    // Zod validation
    try {
      const validationSchema = isSignIn ? signInSchema : signUpSchema;
      validationSchema.parse(data); // Throws error if validation fails
      setErrors({}); // Clear any previous errors if validation is successful
      console.log("data", data);
      if (!isSignIn) {
        // Remove confirmPassword before sending to API
        delete data.confirmPassword;
      }
      let response;
      if (isSignIn) {
        response = await api.post("/auth/login", data);
        toast.success("Signed in successfully!");
        const userData = response.data.data;

        // Set all user data in cookies
        Object.entries(userData).forEach(([key, value]) => {
          document.cookie = `${key}=${value}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        });
        if (userData.userType === "individual") {
          window.location.href = "/";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        response = await api.post("/auth/register", data);

        toast.success("Account created successfully!");
        setIsSignIn(true);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Map Zod errors to field errors
        const zodErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(zodErrors); // Set field-specific errors
      } else if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(`Error: ${errorMessage}`);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex w-full">
      <div
        className="sticky top-0 hidden w-1/2 h-screen bg-center bg-no-repeat bg-cover xl:flex justify-center items-start pt-9"
        style={{ backgroundImage: `url('/images/sign-in.png')` }}
      >
        <Image src={Logo} alt="Housinn logo" width={80} height={48} />
      </div>

      <div className="flex flex-col gap-7 xl:pb-36  text-center px-6 md:px-48 lg:px-56 xl:px-28 xl:pt-9 py-5 xl:items-center min-h-screen xl:h-full justify-center w-full xl:w-1/2">
        <div className="flex justify-center items-center xl:hidden">
          <Image src={Logo} alt="Housinn logo" width={80} height={48} />
        </div>
        <h1 className="text-2xl font-bold">Welcome To Housinn</h1>
        <div className="flex justify-center w-full px-3">
          <button
            className={`px-8 py-2 text-sm border-b-2 focus:outline-none ${
              isSignIn ? "border-primary" : "border-white-300"
            }`}
            onClick={toggleView}
          >
            Sign in
          </button>
          <button
            className={`px-6 py-2 text-sm border-b-2 focus:outline-none ${
              !isSignIn ? "border-primary" : "border-white-300"
            }`}
            onClick={toggleView}
          >
            New Account
          </button>
        </div>
        <form className="px-3 flex flex-col w-full" onSubmit={handleSubmit}>
          {isSignIn ? (
            <>
              {signInFields.map((field) => (
                <div key={field.id} className="mb-3 text-left">
                  <label htmlFor={field.id} className="text-sm font-semibold">
                    {field.label}
                    {errors[field.name] && (
                      <span className="text-red-600 ml-2 text-sm">
                        {errors[field.name]}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    {" "}
                    <input
                      id={field.id}
                      name={field.name}
                      type={
                        field.name === "password" && showPassword
                          ? "text"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      className="w-full  px-2 py-2 placeholder:text-sm border border-white-300 rounded  focus:outline focus:outline-primary"
                    />
                    {field.name === "password" && (
                      <span
                        className="absolute right-2 top-[20%] cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Eye className="text-xs w-5" />
                        ) : (
                          <EyeOff className="text-xs w-5" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}{" "}
            </>
          ) : (
            <>
              {newAccountFields.map((field) => (
                <div key={field.id} className="mb-3 text-left">
                  <label htmlFor={field.id} className="text-sm font-semibold">
                    {field.label}
                    {errors[field.name] && (
                      <span className="text-red-600 ml-2 text-sm">
                        {errors[field.name]}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    {" "}
                    <input
                      id={field.id}
                      name={field.name}
                      type={
                        (field.name === "password" ||
                          field.name === "confirmPassword") &&
                        showPassword
                          ? "text"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      className="w-full px-2 py-2 placeholder:text-sm border border-white-300 rounded focus:outline focus:outline-primary"
                    />
                    {(field.name === "password" ||
                      field.name === "confirmPassword") && (
                      <span
                        className="absolute right-2 top-[20%] cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Eye className="text-xs w-5" />
                        ) : (
                          <EyeOff className="text-xs w-5" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div className="pt-3">
                <p className="text-sm font-semibold">Account Type</p>
                <div className="grid grid-cols-2 grid-rows-2 mt-2">
                  {accountTypes.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center gap-1 text-sm"
                    >
                      <input
                        type="radio"
                        id={type.id}
                        name="userType"
                        value={type.value}
                      />
                      {type.label}
                      {errors.userType && (
                        <span className="text-red-600 ml-2 text-sm">
                          {errors.userType}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2 pt-8 text-sm text-left">
                <input
                  required
                  type="checkbox"
                  name=""
                  id=""
                  className="mt-1"
                />
                <p>
                  {" "}
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-sm font-semibold"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-sm font-semibold"
                  >
                    Privacy Policy
                  </Link>
                </p>
                {/* {errors.termsAccepted && (
                  <span className="text-red-600 ml-2 text-sm">
                    {errors.termsAccepted}
                  </span>
                )}{" "} */}
              </div>
            </>
          )}
          <PrimaryButton
            loading={loading}
            disabled={loading}
            isSignIn={isSignIn}
            className="w-full mt-8 mb-4 py-2 text-base"
          >
            {isSignIn ? "Sign in" : "Create Account"}
          </PrimaryButton>

          {/* {isSignIn && (
            <div className="mb-2 text-center">
              <a
                href="#"
                className="text-sm font-semibold text-primary"
              >
                Forgot your password?
              </a>
            </div>
          )} */}
          {/* <div className="flex items-center justify-center gap-2 text-white-300">
            <div className="flex-1 border border-white-300"></div>
            or
            <div className="flex-1 border border-white-300"></div>
          </div> */}
          {/* <div className="flex flex-col w-full gap-sm pt-3">
            <div className="flex items-center  w-full gap-2 border border-white-300 rounded py-[0.375rem] px-6 justify-center">
              <Image src={Google} alt="google icon" />
              <p className="text-sm font-semibold">
                Sign in with Google
              </p>
            </div>
            <div className="flex items-center  w-full gap-2 border border-white-300 rounded py-[0.375rem] px-6 justify-center">
              <Image src={Apple} alt="apple icon" />
              <p className="text-sm font-semibold">
                Sign in with Apple
              </p>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
