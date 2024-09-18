import React from "react";
import Image from "next/image";

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
  const listedDate = new Date(listing.createdAt).toLocaleDateString();

  return (
    <div className="listing-detail">
      <img
        src={listing.images[0]}
        alt={listing.title}
        className="rounded-t-[7px] w-full h-60 object-cover"
      />
      <h1 className="text-3xl font-bold mt-5">{listing.title}</h1>
      <p className="text-gray-600">{location}</p>
      <h2 className="text-2xl text-primary font-semibold my-4">
        ${listing.price}
      </h2>

      <div className="flex gap-4">
        <div className="flex gap-1">
          <Image src="/icons/ph-bed.svg" alt="Beds" width={24} height={24} />
          <span>{listing.bedroom} Beds</span>
        </div>
        <div className="flex gap-1">
          <Image src="/icons/ph-bath.svg" alt="Baths" width={24} height={24} />
          <span>{listing.bathroom} Baths</span>
        </div>
        <div className="flex gap-1">
          <Image src="/icons/ph-feet.svg" alt="Area" width={24} height={24} />
          <span>
            {listing.latitude} x {listing.longitude} sq.ft
          </span>{" "}
          {/* Assuming you want to show lat x long as area */}
        </div>
      </div>

      <div className="mt-4">
        <span className="text-gray-500">Listed on: {listedDate}</span>
      </div>
    </div>
  );
};

export default ListingDetail;
