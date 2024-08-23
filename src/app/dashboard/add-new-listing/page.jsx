"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Upload from "../../../../public/icons/upload.svg";
import Button from "../profile/Button";

function AddNewListing() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "video/mp4")) {
      setUploadedFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "video/mp4")) {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="w-full flex flex-col gap-5 bg-background-2">
      <h1 className="py-4 px-12 text-2xl font-bold border-b border-gray-500">
        Add New Listing
      </h1>
      <div className="flex flex-col gap-[70px] items-center justify-center px-6 w-full">
        <section className="flex flex-col gap-10">
          <h2 className="font-bold text-lg text-primary text-center">
            Property Information
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-base text-primary">
                    Category
                  </h1>
                  <div className="flex gap-9 text-gray-600 w-full">
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="radio"
                        name="category"
                        value="apartment"
                        className=" border  border-gray-400  rounded-full checked:bg-gray-500 checked:border-transparent focus:outline-none focus:ring-0 focus:ring-offet-2  "
                      />
                      Apartment
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="category" value="land" />
                      Land
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="category" value="duplex" />
                      Duplex
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="category" value="office" />
                      Office
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="category" value="condo" />
                      Condo
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="category" value="store" />
                      Store
                    </label>
                  </div>
                </div>
                <div className="flex gap-20 text-gray-600 w-full">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name="category"
                      value="apartment"
                      className=" border border-gray-400 h-2.5 w-2.5 rounded-full checked:bg-gray-500 checked:border-transparent focus:outline-none focus:ring-0 focus:ring-offet-2  "
                    />
                    Apartment
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="category" value="land" />
                    Land
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="category" value="duplex" />
                    Duplex
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex gap-12">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm font-semibold">
                      Property Type <span className="text-red-600">*</span>
                    </label>

                    <div className="relative">
                      <div className="w-[300px] bg-white flex justify-between cursor-pointer p-[10px] border border-gray-300 rounded-md">
                        <span>Eg. Duplex, Flats, Selfcon</span>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">
                      Property Size
                    </label>
                    <input
                      type="text"
                      name="propertySize"
                      placeholder="Eg.50ft x 100ft, 156ft x 100ft"
                      className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex gap-12">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">
                      Number of bedroom
                    </label>
                    <div className="relative">
                      <div className="w-[300px] bg-white cursor-pointer p-[10px] border border-gray-300 rounded-md">
                        Eg. 1, 2, 4
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Amenities</label>
                    <input
                      type="text"
                      name="amenities"
                      placeholder="Eg. Parking space, CCTV camera, water "
                      className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h2 className="text-base text-primary font-semibold">
                  Location
                </h2>
                <div className="flex flex-col gap-7">
                  <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                      <div className="relative">
                        <div className="w-[300px] bg-white flex justify-between cursor-pointer p-[10px] border border-gray-300 rounded-md">
                          <span>State</span>
                          <ChevronDown />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="relative">
                        <div className="w-[300px] bg-white flex justify-between cursor-pointer p-[10px] border border-gray-300 rounded-md">
                          <span>City</span>
                          <ChevronDown />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        name="streetAddress"
                        placeholder="Street Address"
                        className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        name="landmarks"
                        placeholder="Popular Landmarks"
                        className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">
                    Price of Property <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyPrice"
                    className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    name="description"
                    className="p-[10px] w-[520px] h-[110px] resize-none border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-lg font-bold text-center text-primary">
              Photos and Videos of Property
            </h2>
            <div
              className="flex flex-col py-4 w-[540px] gap-4 justify-center items-center border-secondary border-2 border-dashed rounded-md"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <Image src={Upload} width={42} height={42} alt="Upload Icon" />
              <span>
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-7 w-[540px]">
                    <span className="text-base">
                      Filename: {uploadedFile.name}
                    </span>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-500 text-sm"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <p className="text-center max-w-[330px]">
                    Drag your documents, photos, or videos here to start
                    uploading
                  </p>
                )}
              </span>

              <p>OR</p>
              <input
                type="file"
                id="fileUpload"
                accept=".jpg,.jpeg,.mp4"
                className="hidden"
                onChange={handleFileChange}
              />
              <span></span>
              <label
                htmlFor="fileUpload"
                className="px-6 py-2 border-2 border-secondary rounded-lg text-secondary cursor-pointer"
              >
                Browse files
              </label>
              <span className="text-center">
                Files Supported: JPG, MP4 <br />
                File Size: 30MB max
              </span>
            </div>
          </div>
        </section>
        <section className="w-full flex gap-[329px] justify-center">
          <button className="border border-secondary py-[11px] px-6 rounded-md text-secondary bg-secondary/10">
            Save and Continue
          </button>
          <Button>List Property</Button>
        </section>
      </div>
    </div>
  );
}

export default AddNewListing;
