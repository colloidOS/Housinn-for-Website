"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Upload from "../../../../public/icons/upload.svg";
import Button from "../profile/Button";
import api from "../../../lib/api"; // Adjust the import path accordingly
import Select, { MultiValue } from "react-select";
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
import {
  FormFieldWrapper,
  FormWrapper,
  SectionWrapper,
  Wrapper,
} from "./components/FormFieldWrapper";
import { capitalizeWords } from "@/utils/stringUtils";
import { useAuth } from "@/context/AuthContext";

function AddNewListing() {
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [formData, setFormData] = useState<AddNewListings>({
    title: "",
    images: [],
    state: "",
    city: "",
    type: "",
    amenities: [],
    propertySize: "",
    bedroom: "",
    bathroom: "",
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
  type OptionType = {
    value: string;
    label: string;
  };

  const handleAmenitiesChange = (selectedOptions: MultiValue<OptionType>) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevState) => ({
      ...prevState,
      amenities: selectedValues, // Update the form data with selected values
    }));
  };

  // Map amenities to amenity options
  const amenitiesOptions: OptionType[] = amenities.map((amenity) => ({
    value: amenity,
    label: amenity,
  }));

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
  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB in bytes

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files; // FileList
    if (files.length > 0) {
      const validFiles = Array.from(files).filter(
        (file) =>
          (file.type.startsWith("image/") || file.type === "video/mp4") &&
          file.size <= MAX_FILE_SIZE
      );

      if (validFiles.length + formData.images.length > MAX_FILES) {
        toast.error("You can upload a maximum of 10 images or videos.");
      } else if (validFiles.length !== files.length) {
        toast.error("Some files are too large. Maximum file size is 30MB.");
      } else {
        setFormData((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...validFiles],
        }));
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // This is a FileList
    if (files) {
      const validFiles = Array.from(files).filter(
        (file) =>
          (file.type.startsWith("image/") || file.type === "video/mp4") &&
          file.size <= MAX_FILE_SIZE
      );

      if (validFiles.length + formData.images.length > MAX_FILES) {
        toast.error("You can upload a maximum of 10 images or videos.");
      } else if (validFiles.length !== files.length) {
        toast.error("Some files are too large. Maximum file size is 30MB.");
      } else {
        setFormData((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...validFiles],
        }));
      }
    }
  };
  const handleRemoveFile = (index: number) => {
    setFormData((prevState) => {
      // Convert FileList to an array
      const newImages = Array.from(prevState.images); // No need for null check now
      // Remove the image at the specified index
      newImages.splice(index, 1);
      return {
        ...prevState,
        images: newImages.length > 0 ? newImages : [], // Return an empty array if no images left
      };
    });
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
    formDataToSend.append("bathroom", formData.bathroom);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("propertySize", formData.propertySize);
    formDataToSend.append("desc", formData.description);
    formDataToSend.append("category", formData.category);
    formData.amenities.forEach((amenity, idx) => {
      formDataToSend.append(`amenities`, amenity);
    });

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
  const router = useRouter();

  const handleNavigate = () => {
    router?.push("/dashboard");
  };

  const { user } = useAuth();

  useEffect(() => {
    // Simulate a delay while checking authentication status
    const timer = setTimeout(() => {
      if (user?.userType === "individual") {
        router?.push('/');
      }

      return () => clearTimeout(timer);
    }, 2000);
  });

  if (user?.userType === "individual") {
    return (
      <section className="grid h-full py-10 w-full place-items-center bg-white">
        <div className="fixed left-0 top-0 h-screen w-screen bg-white" />

        <div className="pointer-events-noe text-center relative z-30 flex flex-col gap-y-6 lg:max-w-lg max-w-md px-3 sm:px-0 ">
          <h1 className="text-8xl font-bold text-gray-800 text-center">403</h1>
          <p className="text-center font-medium uppercase text-secondary sm:text-2xl md:text-3xl lg:text-4xl lg:font-bold xl:font-bold">
            Forbidden
          </p>
          <p className="text-gray-500">
            It seems the page you’re looking for doesn’t exist. It may have been
            moved or deleted. Please check the URL, or return to the homepage to
            explore our site.
          </p>

          <p className="text-gray-500 text-center mt-10">
            If you need assistance, please{" "}
            <a
              href="mailto:housinnafrica@gmail.com"
              className="text-blue-600 hover:underline"
            >
              contact our support team
            </a>
            .
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <Wrapper title="Add New Listing">
        <FormWrapper onSubmit={handleSubmit}>
          <SectionWrapper title="Property Information">
            <div className="flex flex-col gap-3 col-span-2">
              <h1 className="font-semibold text-base text-primary">
                Category <span className="text-red-600">*</span>
              </h1>
              <div className="flex flex-wrap gap-y-3  gap-x-5  text-gray-600 w-full">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center  gap-1 text-sm "
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      required
                      className="border  border-gray-400 rounded-full checked:bg-gray-500 checked:border-transparent focus:outline-none focus:ring-0 focus:ring-offset-2"
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
            <FormFieldWrapper label="Property Type" required>
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
            </FormFieldWrapper>
            <FormFieldWrapper label="Property Size">
              <input
                type="text"
                name="propertySize"
                placeholder="Eg.50ft x 100ft, 156ft x 100ft"
                className="p-2 w-full border border-gray-300 rounded-md"
                value={formData.propertySize}
                onChange={handleChange}
              />
            </FormFieldWrapper>
            <FormFieldWrapper label="Number of bedroom" required>
              <input
                type="number"
                name="bedroom"
                placeholder=" Eg. 1, 2, 4"
                className="p-2 w-full border border-gray-300 rounded-md"
                value={formData.bedroom}
                onChange={handleChange}
              />
            </FormFieldWrapper>
            <FormFieldWrapper label="Number of bathroom" required>
              <input
                type="number"
                name="bathroom"
                placeholder=" Eg. 1, 2, 4"
                className="p-2 w-full border border-gray-300 rounded-md"
                value={formData.bathroom}
                onChange={handleChange}
              />
            </FormFieldWrapper>
            <FormFieldWrapper label="Amenities">
              <Select
                isMulti
                name="amenities"
                options={amenitiesOptions}
                // Bind the value prop to match the structure of MultiValue<OptionType>
                value={amenitiesOptions.filter((option) =>
                  formData.amenities.includes(option.value)
                )}
                onChange={handleAmenitiesChange} // Update form data when selection changes
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </FormFieldWrapper>

            <h2 className="text-base text-primary font-semibold col-span-2 ">
              Location
            </h2>

            {/* State Dropdown */}
            <FormFieldWrapper label="State" required>
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
                    {capitalizeWords(state)}
                  </option>
                ))}
              </select>
            </FormFieldWrapper>
            <FormFieldWrapper label="City" required>
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
                      {capitalizeWords(city)}
                    </option>
                  ))}
              </select>
            </FormFieldWrapper>

            <FormFieldWrapper label="">
              <input
                type="text"
                name="address"
                required
                placeholder="Street Address"
                className="p-2 w-full border border-gray-300 rounded-md"
                value={formData.address}
                onChange={handleChange}
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="">
              <input
                type="text"
                name="landmark"
                placeholder="Popular Landmarks"
                className="p-2 w-full border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </FormFieldWrapper>
            <FormFieldWrapper label="Title" required>
              <input
                type="text"
                name="title"
                required
                className="p-2 w-full border border-gray-300 rounded-md"
                value={formData.title}
                onChange={handleChange}
              />
            </FormFieldWrapper>
            <FormFieldWrapper label="Price of Property" required>
              <input
                type="number"
                name="price"
                required
                className="p-2 w-full border border-gray-300 rounded-md"
                value={formData.price}
                onChange={handleChange}
              />
            </FormFieldWrapper>
            <div className="flex flex-col gap-1 col-span-2  w-full">
              <label className="text-sm font-semibold">Description</label>
              <textarea
                name="description"
                className="p-2 w-full h-28 resize-none border border-gray-300 rounded-md"
                value={formData.description}
                required
                onChange={handleChange}
              ></textarea>
            </div>
          </SectionWrapper>

          <section className="flex flex-col gap-8 items-center w-full">
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
                  <div className="flex flex-col items-center justify-center gap-7 w-full">
                    <span className="text-base">Images:</span>
                    <div className="flex gap-4">
                      {Array.from(formData.images).map((file, idx) => (
                        <div className="relative" key={idx}>
                          <img
                            src={URL.createObjectURL(file)} // Create a URL for the image
                            alt={`uploaded-image-${idx}`} // Provide a unique alt text
                            className="w-24 h-24 object-cover rounded-md" // Adjust styles as needed
                          />
                          <button
                            onClick={() => handleRemoveFile(idx)} // Pass the index to the remove function
                            className="absolute -top-3 -right-1  text-black rounded-full "
                          >
                            &times; {/* "X" character */}
                          </button>
                        </div>
                      ))}
                    </div>
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
          </section>
          <section className="w-full flex justify-center md:justify-end">
            <Button
              disabled={loading}
              type="submit"
              onClick={null}
              child={``}
              loading={``}
            >
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
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default AddNewListing;
