import React from "react";
import { Listing } from "../data/listings";
import Camera from "../../public/icons/ph_camera.svg";
import Heart from "../../public/icons/ph_heart.svg";
import Address from "../../public/icons/ph-address.svg";
import Share from "../../public/icons/ph-share.svg";
import Add from "../../public/icons/ph-add.svg";
import Icon from "../../public/icons/ph-icon.svg";
import Bed from "../../public/icons/ph_bed.svg";
import Bath from "../../public/icons/ph_bath.svg";
import Feet from "../../public/icons/ph_feet.svg";
import Image from "next/image";

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <div className="relative rounded-[7px] shadow-custom-property-shadow">
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="rounded-t-[7px] w-full"
      />
      <div className="mt-4 mb-2 flex flex-col gap-2  mx-5 ">
        <span
          className={`text-xs px-2 py-1  absolute top-0 rounded-ss-[7px] left-0 ${
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
        />{" "}
        <Image
          src={Heart}
          alt="image"
          width={18}
          height={18}
          className="absolute top-[14.5rem] right-1 cursor-pointer"
        />{" "}
        <h3 className=" text-xl text-primary font-semibold">{listing.price}</h3>
        <p className="text-gray-700 text-[12px] font-semibold">
          {listing.title}
        </p>
        <div className="flex items-start gap-1">
          <Image src={Address} width={15} height={15} alt="Address" />
          <p className="text-gray-500 text-[12px]">{listing.location}</p>
        </div>
        <div className="flex gap-2 text-gray-500 text-[12px]">
          <span className="flex gap-1">
            <span>
              {" "}
              <Image
                src={Bed}
                alt="image"
                width={15}
                height={15}
                className=" cursor-pointer"
              />{" "}
            </span>
            {listing.beds} Beds
          </span>
          <span className="flex gap-1">
            <span>
              {" "}
              <Image
                src={Bath}
                alt="image"
                width={15}
                height={15}
                className=" cursor-pointer"
              />{" "}
            </span>
            {listing.baths} Baths
          </span>
          <span className="flex gap-1">
            <span>
              {" "}
              <Image
                src={Feet}
                alt="image"
                width={15}
                height={15}
                className=" cursor-pointer"
              />{" "}
            </span>
            {listing.area}
          </span>
        </div>
        <div className="flex pt-3 justify-between w-full">
          {" "}
          <Image
            src={Icon}
            alt="image"
            width={85}
            height={32}
            className=" cursor-pointer"
          />{" "}
          <div className="flex gap-2">
            {" "}
            <Image
              src={Share}
              alt="image"
              width={18}
              height={18}
              className=" cursor-pointer"
            />{" "}
            <Image
              src={Add}
              alt="image"
              width={18}
              height={18}
              className=" cursor-pointer"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
