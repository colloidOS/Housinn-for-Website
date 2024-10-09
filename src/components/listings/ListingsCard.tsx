import React from "react";
import Image from "next/image"; // Import for Next.js optimized image handling
import {
  PhAddress,
  Bed,
  Bath,
  Feet,
  Camera,
  Menu,
} from "../../../public/icons";
import { useRouter } from "next/navigation";
import { ListingsCardProps } from "@/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Combined Listing Card Component
const ListingCard: React.FC<ListingsCardProps> = ({
  listing,
  onSave,
  isSaved,
}) => {
  const router = useRouter();
  console.log("lidhdhsting", listing);
  // Handle card click to navigate to the listing details page
  const handleCardClick = () => {
    router.push(`/listings/${listing.id}`);
  };

  // Format the price as currency
  const formattedPrice = `₦${Number(listing.price).toLocaleString()}`;

  return (
    <div
      className="relative rounded-[7px] shadow-custom-property-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex relative gap-1  cursor-pointer ">
        {/* Listing Image */}
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="rounded-t-[7px] w-full h-60 object-cover"
        />
        <div className="absolute flex bottom-2 gap-1 left-2">
          <Image src={Camera} alt="Camera" width={15} height={15} />
          <p className="text-white text-xs">{listing.imageLength}</p>
        </div>
         {/* Listing Tag */}
         <span
          className={`text-xs px-2 py-1 pr-4 clip-triangle-right absolute top-0 rounded-ss-[7px] left-0 ${
            listing.tag === "sale"
              ? "bg-green-200 text-green-700"
              : listing.tag === "rent"
              ? "bg-blue-200 text-blue-700"
              : listing.tag === "shortlet"
              ? "bg-yellow-200 text-yellow-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {listing.tag === "sale"
            ? "For Sale"
            : listing.tag === "rent"
            ? "For Rent"
            : "Short-Let"}
        </span>
      </div>

      {/* Listing Content */}
      <div className="py-4 mb-2 flex flex-col gap-3 mx-5">
      
        {/* Listing Price */}
        <div className="flex justify-between">
          <h3 className="text-xl text-primary font-semibold">
            {formattedPrice}
          </h3>

          {/* Heart Icon for Saving */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSave(listing.id); // Trigger save/unsave action
            }}
            className="  text-secondary"
          >
            {isSaved ? <FaHeart /> : <FaRegHeart />}
          </div>
          {/* Menu Icon */}
          {/* <Image
            src={Menu}
            alt="Menu"
            width={15}
            height={15}
            className="cursor-pointer"
          /> */}
        </div>

        {/* Listing Title */}
        <p className="text-gray-700 text-xs font-semibold">
          {listing.title}
        </p>

        {/* Listing Location */}
        <div className="flex items-start gap-1">
          <Image src={PhAddress} width={15} height={15} alt="Address icon" />
          <p className="text-gray-500 text-xs">{listing.location}.</p>
        </div>

        {/* Property Details */}
        <div className="flex flex-col gap-3 text-gray-500 text-xs">
          <div className="flex gap-2">
            {" "}
            <div className="flex gap-1">
              <Image src={Bed} alt="Bed icon" width={15} height={15} />
              {listing.beds} Beds
            </div>
            <div className="flex gap-1">
              <Image src={Bath} alt="Bath icon" width={15} height={15} />
              {listing.baths} Baths
            </div>
          </div>
          <div className="flex gap-1">
            <Image src={Feet} alt="Area icon" width={15} height={15} />
            {listing.area} sq.ft
          </div>
        </div>

        {/* Listing Date
        <div className="flex justify-start text-gray-500 text-[10px]">
          <p>Listed: {listing.listed}</p>
        </div> */}
      </div>
    </div>
  );
};

export default ListingCard;
