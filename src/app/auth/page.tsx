"use client";
import Image from "next/image";
import React, { useState } from "react";
import Apple from "../../../public/icons/apple.svg";
import Google from "../../../public/icons/google.svg";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleView = () => {
    setIsSignIn(!isSignIn);
  };

  const signInFields = [
    {
      id: "signin-email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
    },
    {
      id: "signin-password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
    },
  ];

  const newAccountFields = [
    {
      id: "first-name",
      type: "text",
      placeholder: "Enter your first name",
      label: "First name",
    },
    {
      id: "last-name",
      type: "text",
      placeholder: "Enter your last name",
      label: "Last name",
    },
    {
      id: "signup-email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
    },
    {
      id: "signup-password",
      type: "password",
      placeholder: "Create password",
      label: "Password",
    },
    {
      id: "confirm-password",
      type: "password",
      placeholder: "Confirm your password",
      label: "Confirm Password",
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
    <div className="relative flex w-full ">
      <div
        className="sticky top-0 hidden w-1/2 h-screen bg-center bg-no-repeat bg-cover md:flex"
        style={{
          backgroundImage: `url('/images/sign-in.png')`,
        }}
      ></div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <div className="flex flex-col gap-7 px-[65px] pt-[62px] pb-[140px] text-center md:px-[114px] md:pt-9">
          <h1 className="text-2xl font-bold">Welcome To Housinn</h1>
          <div className="flex justify-center w-full px-[13px]">
            <button
              className={`flex-1 px-6 py-2 text-[14px] border-b-2 focus:outline-none ${
                isSignIn ? "border-primary" : "border-white-300"
              }`}
              onClick={() => setIsSignIn(true)}
            >
              Sign in
            </button>
            <button
              className={`px-6 py-2 text-[14px] border-b-2 focus:outline-none ${
                !isSignIn ? "border-primary" : "border-white-300"
              }`}
              onClick={() => setIsSignIn(false)}
            >
              New Account
            </button>
          </div>
          {isSignIn ? (
            <form className="px-[13px]">
              {signInFields.map((field) => (
                <div key={field.id} className="mb-3 text-left">
                  <label
                    htmlFor={field.id}
                    className="text-[14px] font-semibold"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-2 py-2 placeholder:text-[14px] border border-white-300 rounded focus:outline-none"
                  />
                </div>
              ))}
              <button className="w-full py-2 mt-8 mb-4 text-base text-white bg-primary rounded">
                Sign in
              </button>
              <div className="mb-2 text-center">
                <a href="#" className="text-[14px] text-primary">
                  Forgot your password?
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-white-300">
                <div className="flex-1 border-[1px] border-white-300"></div>
                or <div className="flex-1 border-[1px] border-white-300"></div>
              </div>
              <div className="flex flex-col w-full gap-[14px] pt-3">
                <div className="flex items-center justify-between px-[7.6px] py-[6px] pr-[30px] border-[1px] rounded-[5px]">
                  <Image
                    src={Google}
                    width={30}
                    height={30}
                    alt="Sign in with Google"
                  />
                  <p className="text-[14px] font-semibold">
                    Sign in with Google
                  </p>
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
          ) : (
            <form className="flex flex-col gap-3 px-[13px] text-left">
              {newAccountFields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="text-[14px] font-semibold"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-[10px] py-2 placeholder:text-[14px] border border-white-300 rounded focus:outline-none"
                  />
                </div>
              ))}
              <div className="pt-3">
                <p className="text-[14px] font-semibold">Account Type</p>
                <div className="grid grid-cols-2 grid-rows-2 mt-2">
                  {accountTypes.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center gap-1 text-[11px]"
                    >
                      <input
                        type="radio"
                        id={type.id}
                        name="accountType"
                        value={type.value}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                <p className="p-2 my-3 text-[12px] text-center">
                  By submitting, I accept Housinn’s{" "}
                  <span className="font-semibold text-primary">
                    Terms of Use and Privacy
                  </span>
                </p>
              </div>
              <button className="w-full py-2 text-white bg-primary rounded">
                Create Account
              </button>
              <div className="flex items-center justify-center gap-2 text-white-300">
                <div className="flex-1 border-[1px] border-white-300"></div>
                or <div className="flex-1 border-[1px] border-white-300"></div>
              </div>
              <div className="flex flex-col w-full gap-[14px] pt-3">
                <div className="flex items-center justify-between px-[7.6px] py-[6px] pr-[30px] border-[1px] rounded-[5px]">
                  <Image
                    src={Google}
                    width={30}
                    height={30}
                    alt="Sign in with Google"
                  />
                  <p className="text-[14px] font-semibold">
                    Sign in with Google
                  </p>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
