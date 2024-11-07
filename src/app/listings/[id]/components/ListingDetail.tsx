import React, { useState } from "react";
import Image from "next/image";


import { Listings } from "@/types";
import {
  Bed,
  Feet,
  Bath,
  PhAddress,
  Verified,
} from "../../../../../public/icons";

import api from "@/lib/api";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import ImageSection from "./ImageSection";
import ImageGallery from "./ImageGallery";
import Navbar from "@/components/Navbar";

interface ListingDetailProps {
  listing: Listings;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str; // Return if the string is empty
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const location = ` ${capitalizeFirstLetter(
    listing.address
  )}, ${capitalizeFirstLetter(listing.city)}, ${capitalizeFirstLetter(
    listing.state
  )}.`;
  const formattedPrice = `₦${Number(listing.price).toLocaleString()}`;
  console.log("listing", listing);
  console.log(listing.userId);
  const openGallery = (image?: string, index?: number) => {
    setCurrentImage(image || listing.images[0]);
    setCurrentImageIndex(index ?? 0); // Set the clicked image index or default to 0
    setShowGallery(true);
  };
  

  const Name = listing.user.company
    ? listing.user.company.charAt(0).toUpperCase() +
      listing.user.company.slice(1)
    : listing.user.firstName
    ? listing.user.firstName.charAt(0).toUpperCase() +
      listing.user.firstName.slice(1)
    : listing.user.lastName
    ? listing.user.lastName.charAt(0).toUpperCase() +
      listing.user.lastName.slice(1)
    : null;
  const closeGallery = () => {
    setShowGallery(false);
    setCurrentImage(null);
  };
  const { user } = useAuth();

  const id = user?.id;
  const token = user?.token;
  const AddToChat = async () => {
    if (id === listing.userId) {
      toast.error("Cannot message yourself");
    } else {
      try {
        const response = await api.post(
          "/chats",
          { receiverId: listing.userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response:", response.data);

        toast.success("Opening messages");

        // Refresh the page and reroute to the auth page
        setTimeout(() => {
          window.location.href = "/dashboard/messages"; // Refresh and redirect
        }, 1000);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || error.message;
          console.error(
            "Submission Error:",
            error.response?.data || error.message
          );
          toast.error(`Error: ${errorMessage}`);
        }
      }
    }
  };
  const renderAmenities = () => {
    if (!listing.postDetail || listing.postDetail.amenities.length === 0) {
      return <p></p>;
    }

    return (
      <div className="flex flex-wrap gap-4">
        {listing.postDetail.amenities.map((amenity, index) => (
          <div
            key={index}
            className="border border-primary rounded-full px-4 italic font-light py-1 text-sm"
          >
            {amenity}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar colorScheme="alternate" />
      <div className=" justify-between  min-h-[93vh] xl:min-h-[90vh] flex flex-col gap-5 p-2">
        <ImageSection
          images={listing.images}
          title={listing.title}
          openGallery={openGallery}
        />
 
        <div className="flex flex-col xl:flex-row justify-between w-full gap-x-4 gap-y-4 md:gap-y-8  px-2">
          <div className=" flex flex-col flex-1 gap-4 md:gap-8">
            <div className="flex flex-col gap-2">
              <h1 className=" text-4xl text-primary font-bold">
                {formattedPrice}
              </h1>
              <h1 className="text-xl font-bold">{listing.title}</h1>
              <div className="flex gap-2">
                <Image src={PhAddress} alt="Address" width={20} height={20} />
                <p className="text-gray-500 text-[0.875rem]">{location}</p>
              </div>
              <div className="flex flex-col  gap-4">
                <div className="flex gap-2">
                  {" "}
                  <div className="flex gap-1">
                    <Image src={Bed} alt="Beds" width={20} height={20} />
                    <span>{listing.bedroom} Bedrooms</span>
                  </div>
                  <div className="flex gap-1">
                    <Image src={Bath} alt="Baths" width={20} height={20} />
                    <span>{listing.bathroom} Bathrooms</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex  items-center gap-3">
                <img
                  src={listing.user.avatar}
                  alt="logo"
                  className="w-12 h-12 rounded-full"
                />

                <div className="flex gap-1 items-center">
                  {" "}
                  <p className="text-2xl font-semibold">{Name}</p>
                  {listing.ownerType === "public" ? (
                    <Image
                      src={Verified}
                      width={1}
                      height={1}
                      alt="verified"
                      className="h-6 w-6"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {listing.ownerType === "public" ? (
                <p className="py-2.5 px-7 bg-[#62D050]/20 rounded-[8px] w-fit italic font-normal text-sm">
                  This Account is affiliated with the Nigerian Government
                </p>
              ) : (
                ""
              )}
            </div>

            <div>{renderAmenities()}</div>
          </div>

          <div className=" italic flex flex-1 flex-col gap-4 justify-end font-light">
            <div className="flex flex-col gap-2">
              <h2 className="text-base text-[#333333]">
                What you will love about this home
              </h2>
              <p className="text-sm text-[#7D7D7D]">
                {listing.postDetail.desc}
              </p>
            </div>
            <button
              className="bg-primary rounded-[0.5rem] text-white font-semibold text-lg w-full py-3"
              onClick={AddToChat}
            >
              Message
            </button>
          </div>
        </div>
        {showGallery && currentImage && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
    onClick={closeGallery} // Closes the modal when clicking outside the content
  >
    <div
      className="relative w-full max-w-3xl"
      onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the content
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-white">Image</h2>
        <button onClick={closeGallery} className="text-white">
          Close
        </button>
      </div>
      <div className="flex overflow-x-auto p-6">
        <ImageGallery
          images={listing.images}
          currentImage={currentImage}
          currentIndex={currentImageIndex} // Pass index here
        />
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ListingDetail;
