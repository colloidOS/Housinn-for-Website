import React from "react";
import Image from "next/image";
import Camera from "../../public/icons/ph-camera.svg";
import Heart from "../../public/icons/ph-heart.svg";
import Address from "../../public/icons/ph-address.svg";
import Share from "../../public/icons/ph-share.svg";
import Add from "../../public/icons/ph-add.svg";
import Icon from "../../public/icons/ph-icon.svg";
import Bed from "../../public/icons/ph-bed.svg";
import Bath from "../../public/icons/ph-bath.svg";
import Feet from "../../public/icons/ph-feet.svg";

type Listing = {
  id: string;
  price: number;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  imageUrl: string;
  tag: string;
  listed: string;
  category: string;
};

interface ListingCardProps {
  listing: Listing;
  onSave: (id: string) => void; // Function to handle save action
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onSave }) => {
  const handleSaveClick = () => {
    onSave(listing.id); // Call the save function with the listing id
  };

  return (
    <div className="relative rounded-[7px] shadow-custom-property-shadow">
      {/* Listing Image */}
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="rounded-t-[7px] w-full h-60 object-cover"
      />

      {/* Listing Details */}
      <div className="mt-4 mb-2 flex flex-col gap-2 mx-5">
        {/* Tag */}
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

        {/* Icon Overlays */}
        <Image
          src={Camera}
          alt="Camera icon"
          width={15}
          height={15}
          className="absolute top-[14.5rem] left-1 cursor-pointer"
        />
        <Image
          src={Heart}
          alt="Heart icon"
          width={18}
          height={18}
          className="absolute top-[14.5rem] right-1 cursor-pointer"
          onClick={handleSaveClick} // Add onClick handler for save action
        />

        {/* Price */}
        <h3 className="text-xl text-primary font-semibold">${listing.price}</h3>

        {/* Title */}
        <p className="text-gray-700 text-[12px] font-semibold">
          {listing.title}
        </p>

        {/* Location */}
        <div className="flex items-start gap-1">
          <Image src={Address} width={15} height={15} alt="Address icon" />
          <p className="text-gray-500 text-[12px]">{listing.location}</p>
        </div>

        {/* Beds, Baths, Area */}
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

        {/* Footer Icons */}
        <div className="flex pt-3 justify-between w-full">
          <Image src={Icon} alt="Category icon" width={85} height={32} />
          <div className="flex gap-2">
            <Image src={Share} alt="Share icon" width={18} height={18} />
            <Image src={Add} alt="Add icon" width={18} height={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
