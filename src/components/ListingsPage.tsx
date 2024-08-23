import React, { useState } from "react";
import { listings, Listing } from "../data/listings";
import ListingCard from "../components/ListingCard";
import Filter from "../components/Filter";

const ListingsPage: React.FC = () => {
  // State to track the active filter tag
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Function to handle filter change
  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag); // Toggle the filter
  };

  // Filtered listings based on the active tag
  const filteredListings = activeTag
    ? listings.filter((listing) => listing.tag === activeTag)
    : listings;

  return (
    <div className="px-[104px] pt-[35px] pb-[48px]">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold">New Listings</h2>
        <Filter activeTag={activeTag || ""} onChange={handleFilterChange}  />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded">
        View all Listings
      </button>
    </div>
  );
};

export default ListingsPage;
