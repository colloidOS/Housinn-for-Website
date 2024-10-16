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
import ProfileFields from "./ProfileFields";
import PasswordFields from "./PasswordFields";
import AddressFields from "./AddressFields";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

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

  const clearCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const triggerImageUpload = () => {
    document.getElementById("profileImageInput")?.click();
  };

  const router = useRouter();

  const token = user?.token;
  const id = user?.id;
  console.log("id", id);

  useEffect(() => {
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

      // Update the user in AuthContext with the new avatar URL
      setUser((prevUser) => ({
        ...prevUser,
        avatar: updatedAvatarURL, // Update the avatar in the user context
      }));

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
      await api.post("/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear all cookies dynamically
      const cookies = Cookies.get(); // Get all cookies
      for (const cookie in cookies) {
        Cookies.remove(cookie); // Remove each cookie
      }

      // Reset the user state in AuthContext
      setUser(null); // This line clears the user state

      toast.success("You have been logged out. Rerouting...");

      setTimeout(() => {
        router.push("/auth"); // Redirect to auth page
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Submission Error:", error.response?.data || error.message);
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
        <form onSubmit={handleUpdateSubmit}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-10 lg:gap-[164px]">
              <div className="flex flex-col gap-0">
                <p className="text-lg font-semibold">Profile Photo</p>
                <p className="text-sm font-normal text-gray-600">
                  upload your profile photo
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-[33px] px-[28px] lg:pt-[62px] pb-[14px]">
                <div className="relative">
                  {selectedImage ? (
                    <div>
                      <img
                        src={selectedImage}
                        alt="Profile Photo"
                        className="border w-[137px] h-[137px] border-gray-300 relative rounded-full object-cover"
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
                    type="button"
                    onClick={triggerImageUpload}
                    className="focus:outline-none text-nowrap"
                    disabled={isProfileLoading}
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
            <hr className="text-gray-300 pb-5" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">Edit Your Profile</p>
                <p className="text-sm font-normal w-[150px] lg:w-[308px] text-gray-600">
                  Change your account type, edit your contact information, add
                  your social media details and your user details.
                </p>
              </div>
              <div className="flex flex-col px-12 lg:pt-8 gap-16 w-full">
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
                <Button
                  type="submit"
                  className="w-fit"
                  onClick={null}
                  disabled={isProfileLoading}
                >
                  {isProfileLoading ? (
                    <span className="flex items-center gap-2">
                      Uploading <ClipLoader color="#fff" size={20} />
                    </span>
                  ) : (
                    "Upload Profile"
                  )}
                </Button>
              </div>
            </div>
            <hr className="text-gray-300 pb-8" />
          </div>
        </form>
        <div className="flex flex-col gap-4 w-full">
          <form
            className="flex lg:gap-[140px]"
            onSubmit={handleVerificationSubmit}
          >
            <div className="flex flex-col gap-2 text-nowrap">
              <p className="text-lg font-semibold">Verification</p>
              <p className="text-sm font-normal text-gray-600 w-[150px]">
                Get your account verified!
              </p>
            </div>
            <div className="px-12 lg:py-8 flex flex-col gap-8 w-full">
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
              <Button
                type="submit"
                className="w-fit"
                onClick={null}
                disabled={isVerificationLoading}
              >
                {isVerificationLoading ? (
                  <span className="flex items-center gap-2">
                    Verifying <ClipLoader color="#fff" size={20} />
                  </span>
                ) : (
                  "Verify Account"
                )}
              </Button>
            </div>
          </form>
          <form className="flex gap-3 w-full" onSubmit={handlePasswordChange}>
            <div className="flex flex-col gap-0 ">
              <p className="text-lg font-semibold">Change Password</p>
              <p className="text-sm font-normal text-gray-600 w-[150px] lg:w-[300px]">
                *After you change the password you will have to login again.
              </p>
            </div>
            <div className="px-12 py-8 flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-4">
                <div className="flex gap-6 w-full items-center">
                  <PasswordFields
                    updatePassword={updatePassword}
                    setUpdatedPassword={setUpdatedPassword}
                  />
                </div>
              </div>
              <Button
                onClick={null}
                className="w-fit"
                type="submit"
                disabled={isPasswordLoading}
              >
                {isPasswordLoading ? (
                  <span className="flex items-center gap-2">
                    Resetting
                    <ClipLoader color="#fff" size={20} />
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
          <hr className="text-gray-300 py-2" />
        </div>
        <div>
          <hr className="text-gray-300" />
          <div className="flex gap-10 lg:gap-[202px]">
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
