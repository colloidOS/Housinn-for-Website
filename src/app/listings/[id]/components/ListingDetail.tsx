import React from "react";
import Image from "next/image";
import {
  Address,
  Bath,
  Bed,
  Feet,
  PhAddress,
} from "../../../../../public/icons";
import { Map } from "../../../../../public/images";

type Listing = {
  id: string;
  price: number;
  title: string;
  city: string;
  state: string;
  address: string;
  bedroom: number;
  bathroom: number;
  latitude: number;
  longitude: number;
  images: string[];
  type: string;
  createdAt: string;
  category: string;
  desc: string;
};

interface ListingDetailProps {
  listing: Listing;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  const location = ` ${listing.address}, ${listing.city}, ${listing.state}.`;
  const formattedPrice = `₦${Number(listing.price).toLocaleString()}`;
  console.log("listing", listing);
  return (
    <div className="w-full h-screen p-3 flex flex-col gap-[0.875rem]">
      <div className="h-1/2">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full  object-cover"
        />
      </div>

      <div className="h-1/2 flex gap-1">
        {" "}
        <div className="flex flex-col w-3/4 gap-1 ">
          <h1 className="text-4xl text-primary font-bold  ">
            {formattedPrice}
          </h1>
          <h1 className="text-xl font-bold ">{listing.title}</h1>
          <div className="flex">
            <Image src={PhAddress} alt="Beds" width={20} height={20} />
            <p className="text-gray-500 text-[0.875rem]">{location}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-1">
              <Image src={Bed} alt="Beds" width={20} height={20} />
              <span>{listing.bedroom} Beds</span>
            </div>
            <div className="flex gap-1">
              <Image src={Bath} alt="Baths" width={20} height={20} />
              <span>{listing.bathroom} Baths</span>
            </div>
            <div className="flex gap-1">
              <Image src={Feet} alt="Area" width={20} height={20} />
              <span>
                {listing.latitude} x {listing.longitude} sq.ft
              </span>{" "}
              {/* Assuming you want to show lat x long as area */}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex  flex-col h-1/2">
            {" "}
            <img src="/images/map.png" alt="kkkk" className="object-fill " />
          </div>
          <div className="h-1/2">
            <p className=" text-[0.875rem]">{listing.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
