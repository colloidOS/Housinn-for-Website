import React from 'react';
import Button from '../Button';
import ProfileFields from '../ProfileFields';
import { ClipLoader } from 'react-spinners';
import profile from "../../../../../public/icons/profile.svg"
import Image from 'next/image';
const ProfileForm = ({ 
  updatedProfile, 
  setUpdatedProfile, 
  handleUpdateSubmit, 
  isProfileLoading, 
  selectedImage, 
  triggerImageUpload, 
  handleImageUpload 
}) => {
  return (
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
             
                <ProfileFields
                  updatedProfile={updatedProfile}
                  setUpdatedProfile={setUpdatedProfile}
                />
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
  );
};

export default ProfileForm;
