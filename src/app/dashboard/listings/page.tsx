"use client";

import React, { useState } from "react";
import { listings, Listing } from "../../../data/myListing";
import ListingCard from "./ListingCard";
import ListingListItem from "./ListingListItem"; // For list view
import Search from "../../../../public/icons/search-listing.svg";
import Grid_view from "../../../../public/icons/grid-view.svg";
import List_view from "../../../../public/icons/list-view.svg";
import Filter from "./Filter";
import Image from "next/image";

const ListingsPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>("All Properties");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(false); // State to toggle between card and list view

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const toggleView = () => {
    setIsListView(!isListView);
  };

  // Search function that filters by multiple fields
  const handleSearch = () => {
    return listings.filter((listing) => {
      const matchesTag =
        activeTag === "All Properties" || listing.tag === activeTag;

      // Convert the search term to lowercase for case-insensitive comparison
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      // Check if the search term matches any of the relevant fields
      const matchesSearch = [
        listing.title,
        listing.location,
        listing.price.toString(),
        listing.beds.toString(),
        listing.baths.toString(),
        listing.area.toString(),
        listing.tag,
      ].some((field) => field.toLowerCase().includes(lowerCaseSearchTerm));

      return matchesTag && matchesSearch;
    });
  };

  const filteredListings = handleSearch();

  return (
    <div className="px-12 pt-10 pb-12 w-full">
      <div>
        <h1 className="font-bold text-2xl mb-4">My Listings</h1>
      </div>
      <div className="flex justify-between mb-5 items-center">
        {/* Filters */}
        <div className="flex items-center gap-4">
          <Filter activeTag={activeTag || ""} onChange={handleFilterChange} />
          {/* Search bar */}
          <div className="flex relative items-center w-[150px] h-2">
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className=" pl-6 border rounded w-full placeholder:text-[12px] placeholder:flex placeholder:items-center justify-center"
            />
            <button
              onClick={handleSearch}
              className="   rounded-[5px] absolute left-2"
            >
              <Image
                src={Search}
                alt="image"
                width={12}
                height={12}
                className=" cursor-pointer"
              />{" "}
            </button>
          </div>
          {/* Toggle View */}
          <button
            onClick={toggleView}
            className=""
          >
            {isListView ? (
              <Image
                src={Grid_view}
                alt="image"
                width={60}
                height={34}
                className=" cursor-pointer"
              />
            ) : (
              <Image
                src={List_view}
                alt="image"
                width={60}
                height={34}
                className=" cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div
        className={`grid ${
          isListView
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        } gap-4 mt-4`}
      >
        {filteredListings.map((listing) =>
          isListView ? (
            <ListingListItem key={listing.id} listing={listing} />
          ) : (
            <ListingCard key={listing.id} listing={listing} />
          )
        )}
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
