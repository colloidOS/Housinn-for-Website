"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { ChevronDown, Landmark } from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

interface FormData {
  images: File | null;
  state: string;
  city: string;
  type: string;
  amenities: string[];
  propertySize: string;
  bedroom: string;
  price: string;
  description: string;
  category: string;
  address: string;
  landmark: string;
}

function AddNewListing() {
  const [formData, setFormData] = useState<FormData>({
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
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "video/mp4")) {
      setFormData((prevState) => ({
        ...prevState,
        images: file,
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "video/mp4")) {
      setFormData((prevState) => ({
        ...prevState,
        images: file,
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

    const formatString = (str: string) =>
      str.toLowerCase().replace(/\s+/g, "_");

    const payload = {
      postData: {
        price: Number(formData.price),
        address: formData.address,
        city: formatString(formData.city),
        state: formatString(formData.state),
        type: formData.type,
        category: formData.category,
        bedroom: Number(formData.bedroom),
      },
      postDetail: {
        propertySize: formData.propertySize,
        desc: formData.description,
        landmark: formData.landmark,
      },
    };

    try {
      const response = await api.post("/posts", payload);
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error(
        "An error occurred while creating the post. Please try again."
      );
    }
  };

  const handleNavigate = () => {
    const router = useRouter();
    router.push("/dashboard");
  };
  return (
    <div className="w-full flex flex-col gap-5 bg-background-2">
      <ToastContainer />
      <h1 className="py-4 px-12 text-2xl font-bold border-b border-gray-500">
        Add New Listing
      </h1>
      <form
        className="flex flex-col gap-[70px] items-center justify-center px-6 w-full"
        onSubmit={handleSubmit}
      >
        <section className="flex flex-col gap-10">
          <h2 className="font-bold text-lg text-primary text-center">
            Property Information
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-base text-primary">
                  Category
                </h1>
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

              <div className="flex flex-col gap-8">
                <div className="flex gap-12">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm font-semibold">
                      Property Type <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="w-[300px] bg-white p-[10px] border border-gray-300 rounded-md"
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
                            <option
                              key={propertyType.value}
                              value={propertyType.value}
                            >
                              {propertyType.label}
                            </option>
                          )
                        )}
                      </select>
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
                      value={formData.propertySize}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex gap-12">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">
                      Number of bedroom
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="bedroom"
                        placeholder=" Eg. 1, 2, 4"
                        className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                        value={formData.bedroom}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Amenities</label>
                    <div className="relative">
                      <select
                        className="p-[10px] w-[300px] border border-gray-300 rounded-md"
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
                    {/* State Dropdown */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold">State</label>
                      <div className="relative">
                        <select
                          className="w-[300px] bg-white p-[10px] border border-gray-300 rounded-md"
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

                    {/* City Dropdown */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold">City</label>
                      <div className="relative">
                        <select
                          className="w-[300px] bg-white p-[10px] border border-gray-300 rounded-md"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleCityChange}
                          disabled={!formData.state}
                        >
                          <option value="">Select a City</option>
                          {formData.state &&
                            cities[formData.state as keyof typeof cities]?.map(
                              (city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Street Address"
                        className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        name="landmark"
                        placeholder="Popular Landmarks"
                        className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                        onChange={handleChange}
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
                    type="number"
                    name="price"
                    required
                    className="p-[10px] w-[300px] border border-gray-300 rounded-md"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    name="description"
                    className="p-[10px] w-[520px] h-[110px] resize-none border border-gray-300 rounded-md"
                    value={formData.description}
                    required
                    onChange={handleChange}
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
                {formData.images ? (
                  <div className="flex items-center justify-center gap-7 w-[540px]">
                    <span className="text-base">
                      Filename: {formData.images.name}
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
          <button
            onClick={handleNavigate}
            className="border border-secondary py-[11px] px-6 rounded-md text-secondary bg-secondary/10"
          >
            Save and Resume
          </button>
          <Button type="submit" onClick={null}>
            List Property
          </Button>
        </section>
      </form>
    </div>
  );
}

export default AddNewListing;
