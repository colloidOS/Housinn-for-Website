"use client";
import Image from "next/image";
import React, { useState } from "react";
import SignInWithApple from "../../../public/icons/sign-in-with-apple.svg";
import SignInWithGoogle from "../../../public/icons/sign-in-with-google.svg";

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
    <div className="flex w-full">
      <div
        className="w-1/2 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('/images/sign-in.png')`,
        }}
      ></div>

      {/* Right side with form */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="text-center flex flex-col gap-7 px-[114px] pt-9">
          <h1 className="text-2xl font-bold">Welcome To Housinn</h1>
          <div className="flex justify-center">
            <button
              className={`px-6 border-b-2 text-[14px] py-2 focus:outline-none ${
                isSignIn ? "border-primary" : "border-white-300"
              }`}
              onClick={() => setIsSignIn(true)}
            >
              Sign in
            </button>
            <button
              className={`px-6 border-b-2 text-[14px] py-2 focus:outline-none ${
                !isSignIn ? "border-primary" : "border-white-300"
              }`}
              onClick={() => setIsSignIn(false)}
            >
              New Account
            </button>
          </div>
          {isSignIn ? (
            <form className="">
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
                    className="w-full px-4 py-2 border border-white-300 rounded focus:outline-none placeholder:text-[14px]"
                  />
                </div>
              ))}
              <button className="w-full mt-8 mb-4 bg-primary text-base text-white py-2 rounded">
                Sign in
              </button>
              <div className="text-center">
                <a href="#" className="text-primary text-[14px]">
                  Forgot your password?
                </a>
              </div>
              <div className="flex justify-center text-white-300 items-center gap-2">
                <div className="border-[1px] border-white-300 flex-1"></div>
                or <div className="border-[1px] border-white-300 flex-1"></div>
              </div>
              <div className="flex flex-col w-full gap-[14px] pt-3">
                <Image
                  src={SignInWithApple}
                  width={200}
                  height={20}
                  alt="Sign in with Apple"
                  className="w-full"
                />
                <Image
                  src={SignInWithGoogle}
                  width={200}
                  height={10}
                  alt="Sign in with Google"
                  className="w-full"
                />
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-3 text-left">
              {newAccountFields.map((field) => (
                <div key={field.id} className="">
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
                    className="w-full px-4 py-2 border border-white-300 rounded focus:outline-none placeholder:text-[14px]"
                  />
                </div>
              ))}
              <div className="pt-3">
                <p className="text-[14px] font-semibold">Account Type</p>
                <div className="grid grid-cols-2 grid-rows-2 justify-around mt-2">
                  {accountTypes.map((type) => (
                    <label key={type.id} className="text-[13px] ">
                      <input
                        type="radio"
                        id={type.id}
                        name="accountType"
                        value={type.value}
                      />{" "}
                      {type.label}
                    </label>
                  ))}
                </div>
                <p className="text-[10px] p-2 my-3">
                  By submitting, I accept Housinn’s Terms of Use and Privacy
                  Policy{" "}
                </p>
              </div>
              <button className="w-full bg-primary text-white py-2 rounded">
                Create Account
              </button>
              <div className="flex justify-center text-white-300 items-center gap-2">
                <div className="border-[1px] border-white-300 flex-1"></div>
                or <div className="border-[1px] border-white-300 flex-1"></div>
              </div>
              <div className="flex flex-col w-full gap-[14px] pt-3">
                <Image
                  src={SignInWithApple}
                  width={200}
                  height={20}
                  alt="Sign in with Apple"
                  className="w-full"
                />
                <Image
                  src={SignInWithGoogle}
                  width={200}
                  height={10}
                  alt="Sign in with Google"
                  className="w-full"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
