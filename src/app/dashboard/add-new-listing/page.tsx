"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Upload from "../../../../public/icons/upload.svg";
import Button from "../profile/Button";
import api from "../../../lib/api"; // Adjust the import path accordingly
import {
  categories,
  states,
  cities,
  amenities,
  propertyTypes,
} from "../../../data/new-listing"; // Adjust the path as needed
import { AddNewListings } from "@/types";
import { toast } from "sonner";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

function AddNewListing() {
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [formData, setFormData] = useState<AddNewListings>({
    title: "",
    images: null,
    state: "",
    city: "",
    type: "",
    amenities: [],
    propertySize: "",
    bedroom: "",
    price: "",
    description: "",
    category: "",
    address: "",
    landmark: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      state: state,
      city: "", // Clear city selection when state changes
    }));
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      city: e.target.value,
    }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files; // FileList
    if (
      files.length > 0 &&
      (files[0].type === "image/jpeg" || files[0].type === "video/mp4")
    ) {
      setFormData((prevState) => ({
        ...prevState,
        images: files, // Set the FileList here
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // This is a FileList
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        images: files, // Save the FileList to the state
      }));
    }
  };

  const handleRemoveFile = () => {
    setFormData((prevState) => ({
      ...prevState,
      images: null,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Creating a new FormData object to handle both text and file inputs
    const formDataToSend = new FormData();
    const formatString = (str: string) =>
      str.toLowerCase().replace(/\s+/g, "_");

    // Append text fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formatString(formData.city));
    formDataToSend.append("state", formatString(formData.state));
    formDataToSend.append("bedroom", formData.bedroom);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("desc", formData.description);
    formDataToSend.append("category", formData.category);

    // Log and append images (assuming formData.images is an array of File objects)
    if (formData.images && formData.images.length > 0) {
      Array.from(formData.images).forEach((file, idx) => {
        console.log(`Image ${idx}:`, file); // Log each file here
        formDataToSend.append(`images`, file);
      });
    }

    try {
      // Send POST request with formData
      const response = await api.post("/posts", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post created successfully!");
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
      setLoading(false); // Hide loader after fetching
    }
  };

  const handleNavigate = () => {
    const router = useRouter();
    router.push("/dashboard");
  };
  return (
    <div className="w-full flex flex-col gap-5 bg-background-2">
      <h1 className="py-4 px-12 text-2xl font-bold border-b border-gray-500">
        Add New Listing
      </h1>
      <form
        className="flex flex-col gap-16 items-center justify-center px-6 md:px-20 xl:px-52 w-full"
        onSubmit={handleSubmit}
      >
        <section className="grid md:grid-cols-2 gap-x-12 gap-y-8 w-full">
          <h2 className="font-bold text-lg text-primary text-center col-span-2">
            Property Information
          </h2>

          <div className="flex flex-col gap-3 col-span-2">
            <h1 className="font-semibold text-base text-primary">Category</h1>
            <div className="flex gap-9 text-gray-600 w-full">
              {categories.map((category) => (
                <label
                  key={category.value}
                  className="flex items-center gap-1 text-sm"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    required
                    className="border border-gray-400 rounded-full checked:bg-gray-500 checked:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-2"
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        category: e.target.value, // Update the formData with selected category
                      }))
                    }
                  />
                  {category.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">
              Property Type <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full bg-white p-2 border border-gray-300 rounded-md"
                name="type"
                value={formData.type} // Corrected to use formData.type
                onChange={handleChange}
                required
              >
                <option value="">Select a Property Type</option>
                {propertyTypes.map(
                  (
                    propertyType // Rename to propertyType to avoid confusion
                  ) => (
                    <option key={propertyType.value} value={propertyType.value}>
                      {propertyType.label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Property Size</label>
            <input
              type="text"
              name="propertySize"
              placeholder="Eg.50ft x 100ft, 156ft x 100ft"
              className="p-2 w-full border border-gray-300 rounded-md"
              value={formData.propertySize}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Number of bedroom</label>
            <div className="relative">
              <input
                type="number"
                name="bedroom"
                placeholder=" Eg. 1, 2, 4"
                className="p-2 w-full border border-gray-300 rounded-md"
                value={formData.bedroom}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Amenities</label>
            <div className="relative">
              <select
                className="p-2 w-full border border-gray-300 rounded-md"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
              >
                <option value="">Select Amenities</option>
                {amenities.map((amenity) => (
                  <option key={amenity} value={amenity}>
                    {amenity}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="text-base text-primary font-semibold col-span-2 ">
            Location
          </h2>

          {/* State Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">State</label>
            <div className="relative">
              <select
                className="w-full bg-white p-2 border border-gray-300 rounded-md"
                name="state"
                required
                value={formData.state}
                onChange={handleStateChange}
              >
                <option value="">Select a State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">City</label>
            <div className="relative">
              <select
                className="w-full bg-white p-2 border border-gray-300 rounded-md"
                name="city"
                required
                value={formData.city}
                onChange={handleCityChange}
                disabled={!formData.state}
              >
                <option value="">Select a City</option>
                {formData.state &&
                  cities[formData.state as keyof typeof cities]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="address"
              required
              placeholder="Street Address"
              className="p-2 w-full border border-gray-300 rounded-md"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="landmark"
              placeholder="Popular Landmarks"
              className="p-2 w-full border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              className="p-2 w-full border border-gray-300 rounded-md"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">
              Price of Property <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="price"
              required
              className="p-2 w-full border border-gray-300 rounded-md"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              name="description"
              className="p-2 w-full h-28 resize-none border border-gray-300 rounded-md"
              value={formData.description}
              required
              onChange={handleChange}
            ></textarea>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-lg font-bold text-center text-primary">
              Photos and Videos of Property
            </h2>
            <div
              className="flex flex-col py-4 w-full gap-4 justify-center items-center border-secondary border-2 border-dashed rounded-md"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <Image src={Upload} width={42} height={42} alt="Upload Icon" />
              <span>
                {formData.images ? (
                  <div className="flex items-center justify-center gap-7 w-full">
                    <span className="text-base">
                      Filename:{" "}
                      {formData.images && formData.images.length > 0
                        ? formData.images[0].name
                        : "No file selected"}
                    </span>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-500 text-sm"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <p className="text-center max-w-80">
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
                multiple // Allow multiple file uploads
                onChange={handleFileChange}
              />
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
        <section className="w-full flex justify-between">
          <button
            onClick={handleNavigate}
            className="border border-secondary py-3 px-6 rounded-md text-secondary bg-[#0D66B71A]"
          >
            Save and Resume
          </button>
          <Button disabled={loading} type="submit" onClick={null}>
            {loading ? (
              <div className="px-8">
                {" "}
                <TailSpin
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                />
              </div>
            ) : (
              "List Property"
            )}
          </Button>
        </section>
      </form>
    </div>
  );
}

export default AddNewListing;
