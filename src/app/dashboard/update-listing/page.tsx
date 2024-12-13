"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Upload from "../../../../public/icons/upload.svg";

import api from "../../../lib/api";
import Select, { MultiValue } from "react-select";

import { FormDataToSend, UpdateListings } from "@/types";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";
import {
  FormFieldWrapper,
  FormWrapper,
  SectionWrapper,
  Wrapper,
} from "./components/FormFieldWrapper";
import { categories, cities, propertyTypes, states } from "@/data/new-listing";
import Button from "../profile/Button";
import { capitalizeWords } from "@/utils/stringUtils";
import { useAuth } from "@/context/AuthContext";

function UpdateListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateListings>({
    title: "",
    images: [],
    state: "",
    city: "",
    type: "",
    propertySize: "",
    bedroom: "",
    bathroom: "",
    price: "",
    category: "",
    address: "",
    landmark: "",
    postDetail: {
      amenities: [],
      desc: "",
    },
  });
  const [amenitiesOptions, setAmenitiesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/posts/${id}`);
        console.log("updatedata", data.data);
        const updateData = data.data;

        // Map amenities from API response to { value, label } format
        const mappedAmenities =
          updateData.postDetail.amenities.map((amenity: string) => ({
            value: amenity,
            label: amenity,
          })) || [];

        setAmenitiesOptions(mappedAmenities); // Set options for multi-select
        setFormData(updateData);
      } catch (error) {
        console.error("Error fetching listing:", error);
        toast.error("Error fetching listing details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name in formData.postDetail) {
      // Update nested object for postDetail
      setFormData((prevState) => ({
        ...prevState,
        postDetail: {
          ...prevState.postDetail,
          [name]: value,
        },
      }));
    } else {
      // Update top-level state
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAmenitiesChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevState) => ({
      ...prevState,
      amenities: selectedValues,
    }));
  };
  const handleRemoveFile = (index: number) => {
    setFormData((prevState) => {
      const newImages = [...prevState.images];
      newImages.splice(index, 1);
      return {
        ...prevState,
        images: newImages,
      };
    });
  };
  
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      state,
      city: "",
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend: FormDataToSend = {
      bedroom: formData.bedroom,
      bathroom: formData.bathroom,
      category: formData.category,
      title: formData.title,
      state: formData.state,
      city: formData.city,
      price: formData.price,
      type: formData.type,
      address: formData.address,
      desc: formData.postDetail.desc,
    };
    const formDataToSendInstance = new FormData();
    Object.keys(formDataToSend).forEach((key) => {
      if (
        formDataToSend[key as keyof FormDataToSend] !== undefined &&
        formDataToSend[key as keyof FormDataToSend] !== null
      ) {
        formDataToSendInstance.append(
          key,
          formDataToSend[key as keyof FormDataToSend] as string
        );
      }
    });
    console.log("Prepared formData for submission:");

    try {
      console.log("updateformdatatosend", formDataToSend);
      await api.patch(`/posts/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      toast.success("Listing updated successfully!");
      router.push("/dashboard/listings");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper title="Update Listing">
      <FormWrapper onSubmit={handleSubmit}>
        {/* Your existing form fields here */}

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
                    checked={formData.category === category.value}
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
                formData.postDetail.amenities.includes(option.value)
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
              name="desc"
              className="p-2 w-full h-28 resize-none border border-gray-300 rounded-md"
              value={formData.postDetail.desc}
              required
              onChange={handleChange}
            ></textarea>
          </div>
        </SectionWrapper>
        <section className="flex flex-col gap-8 items-center w-full border-secondary border-2 border-dashed rounded-md p-4">
          <h2 className="text-lg font-bold text-center text-primary">
            Photos and Videos of Property
          </h2>

          {/* Display uploaded images */}
          {formData.images && formData.images.length > 0 ? (
            <div className="flex flex-wrap gap-4 w-full justify-center">
              {Array.from(formData.images).map((file, idx) => (
                <div key={idx} className="relative w-24 h-24">
                  <img
                    src={
                      typeof file === "string"
                        ? file
                        : URL.createObjectURL(file)
                    }
                    alt={`Uploaded media ${idx + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white py-0.5 px-2 rounded-full"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center max-w-[80%]">
              Drag your documents, photos, or videos here to start uploading
            </p>
          )}

          {/* Dropzone for adding new files */}
          <div
            className="flex flex-col py-4 w-full gap-4 justify-center items-center "
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Image src={Upload} width={42} height={42} alt="Upload Icon" />
            <p>OR</p>
            <input
              type="file"
              id="fileUpload"
              accept=".jpg,.jpeg,.mp4"
              className="hidden"
              multiple
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

        <Button
          type="submit"
          disabled={loading}
          onClick={null}
          child={``}
          loading={``}
        >
          {loading ? (
            <TailSpin height={20} width={20} color="#fff" ariaLabel="Loading" />
          ) : (
            "Update Listing"
          )}
        </Button>
      </FormWrapper>
    </Wrapper>
  );
}

export default UpdateListing;
