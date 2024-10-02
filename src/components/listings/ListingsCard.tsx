import React from "react";
import Image from "next/image"; // Import for Next.js optimized image handling
import { PhAddress, Bed, Bath, Feet, Camera, Menu } from "../../../public/icons";
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
      {/* Listing Image */}
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="rounded-t-[7px] w-full h-60 object-cover"
      />

      {/* Listing Content */}
      <div className="mt-4 mb-2 flex flex-col gap-2 mx-5">
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

        {/* Camera Icon */}
        <Image
          src={Camera}
          alt="Camera"
          width={15}
          height={15}
          className="absolute top-[14.5rem] left-1 cursor-pointer"
        />

        {/* Heart Icon for Saving */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSave(listing.id); // Trigger save/unsave action
          }}
          className="absolute top-[16rem] right-4 text-secondary"
        >
          {isSaved ? <FaHeart /> : <FaRegHeart />}
        </div>

        {/* Listing Price */}
        <div className="flex justify-between">
          <h3 className="text-xl text-primary font-semibold">{formattedPrice}</h3>
          {/* Menu Icon */}
          <Image
            src={Menu}
            alt="Menu"
            width={15}
            height={15}
            className="cursor-pointer"
          />
        </div>

        {/* Listing Title */}
        <p className="text-gray-700 text-[12px] font-semibold">
          {listing.title}
        </p>

        {/* Listing Location */}
        <div className="flex items-start gap-1">
          <Image src={PhAddress} width={15} height={15} alt="Address icon" />
          <p className="text-gray-500 text-[12px]">{listing.location}</p>
        </div>

        {/* Property Details */}
        <div className="flex gap-2 text-gray-500 text-[12px]">
          <span className="flex gap-1">
            <Image src={Bed} alt="Bed icon" width={15} height={15} />
            {listing.beds} Beds
          </span>
          <span className="flex gap-1">
            <Image src={Bath} alt="Bath icon" width={15} height={15} />
            {listing.baths} Baths
          </span>
          <span className="flex gap-1">
            <Image src={Feet} alt="Area icon" width={15} height={15} />
            {listing.area} sq.ft
          </span>
        </div>

        {/* Listing Date */}
        <div className="flex justify-start text-gray-500 text-[10px]">
          <p>Listed: {listing.listed}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
