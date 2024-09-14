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

import ProfileFields from "./ProfileFields";
import PasswordFields from "./PasswordFields";
import AddressFields from "./AddressFields";

function Profile() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: "",
    lastName: "",
    number: "",
    company: "",
  });
  const [updateVerification, setUpdateVerification] = useState({
    state: selectedState,
    town: selectedCity,
    address: "",
    number: "",
  });
  const [updatePassword, setUpdatedPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Loading state

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
        const response = await api.get(`/users/search/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setUserData(userData);

        // Populate form fields
        setUpdatedProfile({
          firstName: userData.data.firstName || "",
          lastName: userData.data.lastName || "",
          number: userData.data.number || "",
          company: userData.data.company || "",
        });

        setUpdateVerification({
          state: userData.data.state || "",
          town: userData.data.town || "",
          address: userData.data.address || "",
          number: userData.data.number || "",
        });

        setSelectedState(userData.data.state || ""); // Populate state dropdown
        setSelectedCity(userData.data.town || ""); // Populate city dropdown

        setLoading(false);
        console.log(userData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id, token]);
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = {
      ...updatedProfile,
    };
    console.log(updatedProfile);

    try {
      const response = await api.put(`/users/${id}`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response:", response.data); // Check if the response is valid
      toast.success("Updated profile successfully!");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const verificationData = {
      ...updateVerification,
      state: selectedState,
      town: selectedCity,
    };

    console.log(verificationData);

    try {
      const response = await api.put(`/users/${id}`, verificationData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response:", response.data);
      toast.success("Updated location successfully!");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordChange = {
      ...updatePassword,
    };
    console.log(passwordChange);
    try {
      const response = await api.put(
        `/users/changePassword/${id}`,
        updatePassword,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response:", response.data); // Check if the response is valid
      toast.success("Password changed!");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearCookie("Htoken");
      clearCookie("Hid");

      toast.success("You have been logged out. Rerouting..");

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
                    {loading ? (
                      <p>Loading...</p> // Show loading indicator
                    ) : (
                      <ProfileFields
                        updatedProfile={updatedProfile}
                        setUpdatedProfile={setUpdatedProfile}
                      />
                    )}
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
          <form
            className="flex gap-[140px]"
            onSubmit={handleVerificationSubmit}
          >
            <div className="flex flex-col gap-2 text-nowrap">
              <p className="text-lg font-semibold">Verification</p>
              <p className="text-sm font-normal text-gray-600">
                Get your account verified!
              </p>
            </div>
            <div className="px-12 py-8 flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-4">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <AddressFields
                    updateVerification={updateVerification}
                    setUpdateVerification={setUpdateVerification}
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                  />
                )}
              </div>
              <Button type="submit" className="w-fit" onClick={``}>
                Verify Account
              </Button>
            </div>
          </form>
          <form className="flex gap-3 w-full" onSubmit={handlePasswordChange}>
            <div className="flex flex-col gap-0 ">
              <p className="text-lg font-semibold">Change Password</p>
              <p className="text-sm font-normal text-gray-600 w-[300px]">
                *After you change the password you will have to login again.
              </p>
            </div>
            <div className="px-12 py-8 flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-4">
                <div className="flex gap-6 w-full">
                  <PasswordFields
                    updatePassword={updatePassword}
                    setUpdatedPassword={setUpdatedPassword}
                  />
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
