"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../../../../public/icons/profile.svg";
import Button from "./Button";
import Dropdown from "./Dropdown";
import axios from "axios";
import api from "@/lib/api";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const stateOptions = ["Lagos", "Enugu", "Osun"];
const cityOptions = ["Surulere", "Maitama", "Victoria Island"];

function Profile() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    town: "",
    userType: "agent", // Set default value for userType
    password: "", // Add password field to match Postman
  });
  const [userData, setUserData] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const triggerImageUpload = () => {
    document.getElementById("profileImageInput")?.click();
  };

  const router = useRouter();

  const token = Cookies.get("token");
  const id = Cookies.get("id");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        console.log(JSON.parse(jsonPayload)); // This will show the contents of the token
      }
      try {
        const response = await axios.get(
          `https://housinn.onrender.com/api/users/search/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [token, id]);

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = {
      ...updatedProfile,
      userType: "agent", // or from state if dynamic
      password: updatedProfile.password || "coal", // Assign default password or user's input
    };
    console.log(updatedProfile);
    console.log(token);
    console.log("ID:", id);
    try {
      const response = await axios.put(
        `https://housinn.onrender.com/api/users/${id}`,
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response:", response.data); // Check if the response is valid
      toast.success("Successfully updated profile");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      clearCookie("token");
      clearCookie("id");

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");

      toast.success("Logged out successfully!");

      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col px-12 py-10 gap-8 bg-background-2 w-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-black">Profile</h3>
          <hr className="text-gray-300" />
        </div>
        <div>
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
                    Select your Image/Photo
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
          <form className="flex flex-col gap-6" onSubmit={handleUpdateSubmit}>
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
                            value={updatedProfile.firstName}
                            onChange={(e) =>
                              setUpdatedProfile({
                                ...updatedProfile,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="w-full gap-1">
                          <label
                            className="block text-gray-700 text-sm font-bold"
                            htmlFor="lastName"
                          >
                            Last Name{" "}
                          </label>
                          <input
                            id="LastName"
                            type="text"
                            placeholder="Chukwueke"
                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                            value={updatedProfile.lastName}
                            onChange={(e) =>
                              setUpdatedProfile({
                                ...updatedProfile,
                                lastName: e.target.value,
                              })
                            }
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
                            value={updatedProfile.town}
                            onChange={(e) =>
                              setUpdatedProfile({
                                ...updatedProfile,
                                town: e.target.value,
                              })
                            }
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
                            value={updatedProfile.email}
                            onChange={(e) =>
                              setUpdatedProfile({
                                ...updatedProfile,
                                email: e.target.value,
                              })
                            }
                          />
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
                        />
                      </div>
                      <div className="w-full gap-1">
                        <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          id="number"
                          type="text"
                          placeholder="08012345678"
                          className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                          value={updatedProfile.password}
                          onChange={(e) =>
                            setUpdatedProfile({
                              ...updatedProfile,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-fit">
                  Upload Profile
                </button>
              </div>
            </div>
            <hr className="text-gray-300 pb-8" />
          </form>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <form className="flex gap-[140px]">
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
                      onChange={``}
                      placeholder="State"
                    />
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
                      onChange={``}
                      placeholder="City"
                    />
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
                  />
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
                  />
                </div>
              </div>
              <Button type="submit" className="w-fit" onClick={``}>
                Verify Account
              </Button>
            </div>
          </form>
          <form className="flex gap-3 w-full">
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
                  />
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
                    />
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
                    />
                  </div>
                </div>
              </div>
              <Button onClick={``} className="w-fit">
                Reset Password
              </Button>
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
                onClick={handleLogout}
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
