"use client";
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import profile from "../../../../public/icons/profile.svg";
import Button from "./Button";
import { ChevronDown } from "lucide-react";
import Dropdown from "./Dropdown";

// Zod schemas for each section
const profileSchema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
});

const verificationSchema = z.object({
  state: z.string().min(1, "State is required"),
  city: z.string().min(0, "City is required"),
  street: z.string().min(4, "Street is required"),
  cacNumber: z.string().min(1, "CAC Number is required"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(3, "Current Password is required"),
    newPassword: z
      .string()
      .min(6, "New Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const stateOptions = ["Lagos", "Enugu", "Osun"];
const cityOptions = ["Surulere", "Maitama", "Victoria Island"];

function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerVerification,
    handleSubmit: handleVerificationSubmit,
    formState: { errors: verificationErrors },
  } = useForm({
    resolver: zodResolver(verificationSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    document.getElementById("profileImageInput").click();
  };

  const onSubmitProfile = (data) => {
    console.log("Profile Data:", data);
  };

  const onSubmitVerification = (data) => {
    console.log("Verification Data:", data);
  };

  const onSubmitPassword = (data) => {
    console.log("Password Data:", data);
  };

  return (
    <>
      <div className="flex flex-col px-12 py-10 gap-8 bg-background-2 w-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-black">Profile</h3>
          <hr className="text-gray-300" />
        </div>
        <form onSubmit={handleProfileSubmit(onSubmitProfile)}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-[164px]">
              <div className="flex flex-col gap-0">
                <p className="text-lg font-semibold">Profile Photo</p>
                <p className="text-sm font-normal text-gray-600">
                  upload your profile photo
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-[33px] px-[28px] pt-[62px] pb-[14px]">
                <div className="relative">
                  {selectedImage ? (
                    <div>
                      <img
                        src={selectedImage}
                        alt="Profile Photo"
                        className="border max-w-[137px] max-h-[137px] border-gray-300 relative rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <Image
                      src={profile}
                      alt="select-profile"
                      height={137}
                      width={137}
                      className="border border-gray-300 rounded-full"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <Button
                    onClick={triggerImageUpload}
                    className="focus:outline-none"
                  >
                    Upload Profile Image/Photo
                  </Button>
                  <span className="text-gray-500 text-sm font-normal">
                    *minimum 500px x 500px
                  </span>
                  <input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
            <hr className="text-gray-300" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">Edit Your Profile</p>
                <p className="text-sm font-normal w-[308px] text-gray-600">
                  Change your account type, edit your contact information, add
                  your social media details and your user details.
                </p>
              </div>
              <div className="flex flex-col px-12 pt-8 gap-16">
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="text-primary font-semibold">Account Type</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-primary font-semibold">
                      Contact Information
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex gap-6 w-full">
                        <div className="w-full gap-1">
                          <label
                            className="block text-gray-700 text-sm font-bold"
                            htmlFor="firstName"
                          >
                            First Name
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            placeholder="Michael"
                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                            {...registerProfile("firstName")}
                          />
                          {profileErrors.firstName && (
                            <span className="text-red-500 text-sm">
                              {profileErrors.firstName.message}
                            </span>
                          )}
                        </div>
                        <div className="w-full gap-1">
                          <label
                            className="block text-gray-700 text-sm font-bold"
                            htmlFor="lastName"
                          >
                            Last Name{" "}
                            {profileErrors.lastName && (
                              <span className="text-red-500 text-sm">
                                {profileErrors.lastName.message}
                              </span>
                            )}
                          </label>
                          <input
                            id="LastName"
                            type="text"
                            placeholder="Chukwueke"
                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                            {...registerProfile("lastName")}
                          />
                        </div>
                      </div>
                      <div className="flex gap-6 w-full">
                        <div className="w-full gap-1">
                          <label
                            className="block text-gray-700 text-sm font-bold"
                            htmlFor="companyName"
                          >
                            Company Name (optional)
                          </label>
                          <input
                            id="company"
                            type="text"
                            placeholder="Mike’s Realties"
                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                            {...registerProfile("company")}
                          />
                        </div>
                        <div className="w-full gap-1">
                          <label
                            className="block text-gray-700 text-sm font-bold"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="mikesrealties@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                            {...registerProfile("email")}
                          />
                          {profileErrors.email && (
                            <span className="text-red-500 text-sm">
                              {profileErrors.email.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full gap-1">
                        <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="phoneNumber"
                        >
                          Phone Number
                        </label>
                        <input
                          id="number"
                          type="text"
                          placeholder="08012345678"
                          className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                          {...registerProfile("phoneNumber")}
                        />
                        {profileErrors.phoneNumber && (
                          <span className="text-red-500 text-sm">
                            {profileErrors.phoneNumber.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-fit">Upload Profile</Button>
              </div>
            </div>
            <hr className="text-gray-300 pb-8" />
          </div>
        </form>
        <div className="flex flex-col gap-4 w-full">
          <form
            className="flex gap-[140px]"
            onClick={handleVerificationSubmit(onSubmitVerification)}
          >
            <div className="flex flex-col gap-2 text-nowrap">
              <p className="text-lg font-semibold">Verification</p>
              <p className="text-sm font-normal text-gray-600">
                Get your account verified!
              </p>
            </div>
            <div className="px-12 py-8 flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-4">
                <div className="flex gap-6 w-full">
                  <div className="flex flex-col gap-1 relative w-full">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="newPassword"
                    >
                      State
                    </label>
                    <Dropdown
                      options={stateOptions}
                      value={selectedState}
                      onChange={(option) => setSelectedState(option)}
                      placeholder="State"
                    />
                    {verificationErrors.state && (
                      <span className="text-red-500 text-sm">
                        {verificationErrors.state.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 relative w-full">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="newPassword"
                    >
                      City
                    </label>
                    <Dropdown
                      options={cityOptions}
                      value={selectedCity}
                      onChange={(option) => setSelectedCity(option)}
                      placeholder="City"
                    />
                    {verificationErrors.city && (
                      <span className="text-red-500 text-sm">
                        {verificationErrors.city.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="currentPassword"
                  >
                    Street
                  </label>
                  <input
                    id="street"
                    type="text"
                    placeholder="e.g No 25 Asokoro Street"
                    className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                    {...registerVerification("street")}
                  />
                  {verificationErrors.street && (
                    <span className="text-red-500 text-sm">
                      {verificationErrors.street.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="currentPassword"
                  >
                    CAC Number
                  </label>
                  <input
                    id="cacNumber"
                    type="text"
                    placeholder="Enter your CAC Registration Code(RC Number)"
                    className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                    {...registerVerification("cacNumber")}
                  />
                  {verificationErrors.cacNumber && (
                    <span className="text-red-500 text-sm">
                      {verificationErrors.cacNumber.message}
                    </span>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-fit">
                Verify Account
              </Button>
            </div>
          </form>
          <form
            className="flex gap-3 w-full"
            onSubmit={handlePasswordSubmit(onSubmitPassword)}
          >
            <div className="flex flex-col gap-0 ">
              <p className="text-lg font-semibold">Change Password</p>
              <p className="text-sm font-normal text-gray-600 w-[300px]">
                *After you change the password you will have to login again.
              </p>
            </div>
            <div className="px-12 py-8 flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="currentPassword"
                  >
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="text"
                    placeholder="Enter your current password"
                    className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                    {...registerPassword("currentPassword")}
                  />
                  {passwordErrors.currentPassword && (
                    <span className="text-red-500 text-sm">
                      {passwordErrors.currentPassword.message}
                    </span>
                  )}
                </div>
                <div className="flex gap-6 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="newPassword"
                    >
                      New Password
                    </label>
                    <input
                      id="newPass"
                      type="text"
                      placeholder="Enter your new password"
                      className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                      {...registerPassword("newPassword")}
                    />
                    {passwordErrors.newPassword && (
                      <span className="text-red-500 text-sm">
                        {passwordErrors.newPassword.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="updatePass"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="updatePassword"
                      type="text"
                      placeholder="Confirm your new password"
                      className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                      {...registerPassword("confirmPassword")}
                    />
                    {passwordErrors.confirmPassword && (
                      <span className="text-red-500 text-sm">
                        {passwordErrors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button className="w-fit">Reset Password</Button>
            </div>
          </form>
          <hr className="text-gray-300 py-2" />
        </div>
        <div>
          <hr className="text-gray-300" />
          <div className="flex gap-[202px]">
            <div className="flex flex-col gap-2 w-">
              <p className="text-lg font-semibold">Logout</p>
              <p className="text-sm font-normal text-gray-600">
                Logout from this device
              </p>
            </div>
            <div>
              <button
                className={`px-6 py-[11px] flex gap-2 items-center focus:outline-primary bg-primary text-white rounded-md text-base font-semibold`}
              >
                {" "}
                <img src="/icons/sign_out.svg" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
