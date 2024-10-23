"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../../../../public/icons/profile.svg";
import Button from "./Button";
import axios from "axios";
import api from "@/lib/api";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import ProfileForm from "./components/ProfileForm";
import VerificationForm from "./components/VerificationForm";
import PasswordForm from "./components/PasswordForm";
function Profile() {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null); // Correct typing
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For preview as a string
  const [isProfileLoading, setProfileLoading] = useState(false);
  const [isVerificationLoading, setVerificationLoading] = useState(false);
  const [isPasswordLoading, setPasswordLoading] = useState(false);
  const [isLogoutLoading, setLogoutLoading] = useState(false);
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
      setSelectedImageFile(file); // Store the actual file for submission
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Store the image URL for preview
      };
      reader.readAsDataURL(file);
    }
  };
  const { user, setUser } = useAuth();

  const triggerImageUpload = () => {
    document.getElementById("profileImageInput")?.click();
  };

  const router = useRouter();

  const token = user?.token;
  const id = user?.id;
  console.log("id", id);

  useEffect(() => {
    // Check if the page has already been reloaded
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      // Reload the page and set a flag to prevent further reloads
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      // Fetch the data after reload
      const fetchData = async () => {
        try {
          const response = await api.get(`/users/search/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data;
          setUserData(userData);

          // If avatar exists, set it for preview
          if (userData.data.avatar) {
            setSelectedImage(userData.data.avatar); // Set the avatar URL
          }

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
    }
  }, [id, token]);

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    const formData = new FormData();

    // Append other profile fields to FormData
    formData.append("firstName", updatedProfile.firstName);
    formData.append("lastName", updatedProfile.lastName);
    formData.append("number", updatedProfile.number);
    formData.append("company", updatedProfile.company);

    if (selectedImageFile) {
      formData.append("avatar", selectedImageFile);
    }

    try {
      const response = await api.put(`/users/${user?.id}`, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      console.log("Response:", response.data);
      toast.success("Profile updated successfully!");
      console.log(response.data.data.avatar);
      const updatedAvatarURL = response.data.data.avatar; // Extract the correct Cloudinary URL from the response

      // Set the Cloudinary avatar URL in cookies
      Cookies.set("avatar", updatedAvatarURL);

      // setUser((prevUser) => ({
      //   ...prevUser,
      //   avatar: updatedAvatarURL, // Update the avatar in the user context
      // }));

      // Also save user info in cookies or localStorage based on your current strategy
      Cookies.set("firstName", updatedProfile.firstName);
      Cookies.set("lastName", updatedProfile.lastName);
      Cookies.set("number", updatedProfile.number);
      Cookies.set("company", updatedProfile.company);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error(
          "Submission Error:",
          error.response?.data || error.message
        );
        toast.error(`Error: ${errorMessage}`);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationLoading(true);
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
    } finally {
      setVerificationLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
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
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error(
          "Submission Error:",
          error.response?.data || error.message
        );
        toast.error(`Error: ${errorMessage}`);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setPasswordLoading(false);
    }
  };
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear all cookies
      Object.keys(Cookies.get()).forEach((cookie) => {
        Cookies.remove(cookie);
      });

      // Reset the user state in AuthContext
      setUser(null); // Clears user state

      toast.success("You have been logged out. Refreshing...");

      // Refresh the page and reroute to the auth page
      setTimeout(() => {
        window.location.href = "/auth"; // Refresh and redirect
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error(
          "Submission Error:",
          error.response?.data || error.message
        );
        toast.error(`Error: ${errorMessage}`);
      }
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col px-12 py-10 gap-8 bg-background-2 w-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-black">Profile</h3>
          <hr className="text-gray-300" />
        </div>
        <ProfileForm
          updatedProfile={updatedProfile}
          setUpdatedProfile={setUpdatedProfile}
          handleUpdateSubmit={handleUpdateSubmit}
          isProfileLoading={isProfileLoading}
          selectedImage={selectedImage}
          triggerImageUpload={triggerImageUpload}
          handleImageUpload={handleImageUpload}
        />
        <div className="flex flex-col gap-4 w-full">
          <VerificationForm
            updateVerification={updateVerification}
            setUpdateVerification={setUpdateVerification}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            handleVerificationSubmit={handleVerificationSubmit}
            isVerificationLoading={isVerificationLoading}
            loading={loading}
          />
          <PasswordForm
            updatePassword={updatePassword}
            setUpdatedPassword={setUpdatedPassword}
            handlePasswordChange={handlePasswordChange}
            isPasswordLoading={isPasswordLoading}
          />
          <hr className="text-gray-300 py-2" />
        </div>
        <div>
          <hr className="text-gray-300" />
          <div className="flex sm:flex-row flex-col gap-10 lg:gap-[202px]">
            <div className="flex flex-col gap-2 w-">
              <p className="text-lg font-semibold">Logout</p>
              <p className="text-sm font-normal text-gray-600">
                Logout from this device
              </p>
            </div>
            <div>
              <Button
                type="button"
                onClick={handleLogout}
                disabled={isLogoutLoading}
              >
                {isLogoutLoading ? (
                  <span className="flex items-center gap-2">
                    Logging out <ClipLoader color="#fff" size={20} />
                  </span>
                ) : (
                  "Logout"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
