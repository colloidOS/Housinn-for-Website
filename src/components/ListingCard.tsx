import React from "react";
import { Listing } from "../data/listings";
import Camera from "../../public/icons/ph_camera.svg";
import Heart from "../../public/icons/ph_heart.svg";
import Image from "next/image";

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <div className="relative rounded-md shadow-md">
      <img src={listing.imageUrl} alt={listing.title} className=" w-full" />
      <div className="mt-4 flex flex-col gap-2  mx-5 ">
        <span
          className={`text-xs px-2 py-1  absolute top-1 left-1 ${
            listing.tag === "For Sale"
              ? "bg-green-200 text-green-700"
              : listing.tag === "For Rent"
              ? "bg-blue-200 text-blue-700"
              : listing.tag === "Short-let"
              ? "bg-yellow-200 text-yellow-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {listing.tag}
        </span>
        <Image
          src={Camera}
          alt="image"
          width={15}
          height={15}
          className="absolute top-[14.5rem] left-1"
        />{" "} <Image
        src={Heart}
        alt="image"
        width={18}
        height={18}
        className="absolute top-[14.5rem] right-1"
      />{" "}
        <h3 className=" text-xl text-primary font-semibold">{listing.price}</h3>
        <p className="text-gray-700 text-[12px] font-semibold">
          {listing.title}
        </p>
        <p className="text-gray-500 text-[10px]">{listing.location}</p>
        <div className="flex justify-between ">
          <span>{listing.beds} Beds</span>
          <span>{listing.baths} Baths</span>
          <span>{listing.area}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
