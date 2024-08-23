import React, { useState } from "react";
import { listings, Listing } from "../data/listings";
import ListingCard from "../components/ListingCard";
import Filter from "../components/Filter";

const ListingsPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag); 
  };

  // Filtered listings based on the active tag
  const filteredListings = activeTag
    ? listings.filter((listing) => listing.tag === activeTag)
    : listings;

  return (
    <div className="px-[104px] pt-[35px] pb-[48px] w-full">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold">New Listings</h2>
        <Filter activeTag={activeTag || ""} onChange={handleFilterChange}  />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    <div className="w-full flex justify-center">
    <button className="mt-8 px-4 py-2 bg-primary text-white rounded-[5px]">
        View all Listings
      </button>
    </div>
    </div>
  );
};

export default ListingsPage;
