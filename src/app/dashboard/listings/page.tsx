
"use client"
import React, { useState } from "react";
import { listings } from "../../../data/myListing";
import ListingCard from "./ListingCard";
import ListingListItem from "./ListingListItem";
import Search from "../../../../public/icons/search-listing.svg";
import Grid_view from "../../../../public/icons/grid-view.svg";
import List_view from "../../../../public/icons/list-view.svg";
import Filter from "./Filter";
import Image from "next/image";

const ListingsPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>("All Properties");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(false);

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const toggleView = () => {
    setIsListView(!isListView);
  };

  const handleSearch = () => {
    return listings.filter((listing) => {
      const matchesTag =
        activeTag === "All Properties" || listing.tag === activeTag;

      const lowerCaseSearchTerm = searchTerm.toLowerCase();

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
        <div className="flex items-center gap-4">
          <Filter activeTag={activeTag || ""} onChange={handleFilterChange} />
          <div className="flex relative items-center w-[150px] h-2">
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="pl-6 border rounded w-full placeholder:text-[12px] placeholder:flex placeholder:items-center justify-center"
            />
            <button className="rounded-[5px] absolute left-2">
              <Image
                src={Search}
                alt="image"
                width={12}
                height={12}
                className="cursor-pointer"
              />
            </button>
          </div>
          <button onClick={toggleView} className="">
            {isListView ? (
              <Image
                src={Grid_view}
                alt="image"
                width={60}
                height={34}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src={List_view}
                alt="image"
                width={60}
                height={34}
                className="cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>

      {isListView ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Property Title</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((listing) => (
              <ListingListItem key={listing.id} listing={listing} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
