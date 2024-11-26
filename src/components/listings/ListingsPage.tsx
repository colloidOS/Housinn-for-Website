"use client";
import React, { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { GridView, ListView, Search } from "../../../public/icons";
import { FilterValues, ListingsPageProps } from "@/types";
import useFetchListings from "@/hooks/useFetchListings";
import ListingCard from "@/components/listings/ListingsCard";
import useSaveListing from "@/hooks/useSaveListing";
import ListingsFilter from "./ListingsFilter";
import ListingSort from "./ListingSort";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

const ListingsPageContent: React.FC<ListingsPageProps> = ({
  getRoute,
  dataRoute,

  pageTitle,
  className = "",
  noListingsMessage = "No listings available",
}) => {
  const [activeTag, setActiveTag] = useState<string | null>("all-properties");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchParams = useSearchParams(); // Use useSearchParams
  const [isListView, setIsListView] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("viewMode") === "list";
    }
    return false; // Default to grid view if localStorage is not available
  });
  const [filters, setFilters] = useState<FilterValues>({}); // Correctly typed filters



  const tag = searchParams.get("tag");
  useEffect(() => {
    if (tag) {
      setActiveTag(tag); // Set the activeTag based on the query parameter
    }
    // console.log("activetag", activeTag);
  }, [tag]);
  // console.log("this is the tag", tag);
  const applyFilters = (selectedFilters: FilterValues) => {
    // console.log("this is it", selectedFilters);
    setFilters(selectedFilters);
    console.log("selected", selectedFilters);
  };

  const constructGetRoute = () => {
    const queryParams = new URLSearchParams();

    // Add filters to the query string if they have values

    if (filters.city)
      queryParams.append("city", filters.city.toLocaleLowerCase());
    if (filters.category)
      queryParams.append("category", filters.category.toLocaleLowerCase());
    if ((filters.type || activeTag) && activeTag !== "all-properties") {
      queryParams.append(
        "type",
        (filters.type ?? activeTag ?? "").toLowerCase()
      );
    }
  

    if (filters.bedroom)
      queryParams.append("bedroom", filters.bedroom.toLocaleLowerCase());
    if (filters.minPrice)
      queryParams.append("minPrice", filters.minPrice.toLocaleLowerCase());
    if (filters.maxPrice)
      queryParams.append("maxPrice", filters.maxPrice.toLocaleLowerCase());
    if (filters.title) queryParams.append("title", filters.title);
    if (filters.address)
      queryParams.append("address", filters.address.toLocaleLowerCase());
    if (filters.bathroom) queryParams.append("bathroom", filters.bathroom);
    if (filters.state)
      queryParams.append("state", filters.state.toLocaleLowerCase());
    if (filters.ownerType)
      queryParams.append("ownerType", filters.ownerType.toLocaleLowerCase());
    if (searchTerm) queryParams.append("searchText", searchTerm);
    const fullRoute = `${getRoute}?${queryParams.toString()}`;
    console.log("searchitem2", searchTerm);
    // Log the route to the console
    console.log("Constructed API Route:", fullRoute);

    return fullRoute;
  };

  const { listings, loading, setListings } = useFetchListings(
    constructGetRoute(), // Pass dynamically constructed route
    dataRoute,
    searchTerm
  );

  const saveListing = useSaveListing(listings, setListings);
  const handleSave = (id: string, isSaved: boolean) => {
    saveListing(id, isSaved);
  };
  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? "all-properties" : tag);
    if (tag === "all-properties") {
      setFilters({}); // Clear all filters when selecting "all-properties"
    } else {
      setFilters((prev) => ({
        ...prev,
        type: tag, // Set `type` or reset
      }));
    }
  };
  const handleSearch = () => {
    setSearchTerm(searchTerm);
  };
  const toggleView = () => {
    const newView = !isListView;
    setIsListView(newView);
    // Save the new view mode to localStorage
    localStorage.setItem("viewMode", newView ? "list" : "grid");
  };

  useEffect(() => {
    localStorage.removeItem("viewMode");
  }, []);

  return (
    <div className={` ${className || ""}`}>
      <div>
        <h1 className="font-bold text-xl text-center md:text-left md:text-2xl mb-4">
          {pageTitle}
        </h1>{" "}
        {/* Dynamic title */}
      </div>

      <div className="flex flex-row-reverse md:flex-row items-center gap-2 md:gap-8 mb-5 justify-between w-full">
        <ListingsFilter
          activeTag={activeTag || ""}
          onChange={handleFilterChange}
          constructGetRoute={constructGetRoute}
          applyFilters={applyFilters}
        />
        <div className="flex relative items-center flex-1 h-full">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-2 text-right flex flex-1 p-2 h-11 border border-gray-300 rounded w-full placeholder:text-sm text-sm placeholder:text-right"
          />
          <button
            onClick={handleSearch}
            className="rounded-[5px] absolute left-2"
          >
            <Image
              src={Search}
              alt="search"
              width={20}
              height={20}
              className=" cursor-pointer opacity-60"
            />
          </button>
        </div>
        <button className="hidden md:flex" onClick={toggleView}>
          {isListView ? (
            <Image
              src={GridView}
              alt="Grid view"
              width={0}
              height={0}
              
              className="cursor-pointer w-21 h-11"
            />
          ) : (
            <Image
              src={ListView}
              alt="List view"
              width={0}
              height={0}
              className="cursor-pointer w-21 h-11"
            />
          )}
        </button>
      </div>

      {loading ? (
        isListView ? ( // Check if in list view
          <motion.div
            className="grid grid-cols-1 gap-1"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0.2 }}
          >
            {Array(15)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className={`w-full rounded-none h-10 border-b border-b-gray-400 cursor-pointer bg-gray-200 ${
                    index === 0 ? "bg-gray-300" : ""
                  }`}
                />
              ))}
          </motion.div>
        ) : (
          // Check if in grid view
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mt-4"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0.2 }}
          >
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-80 rounded-[7px] cursor-pointer bg-gray-300"
                />
              ))}
          </motion.div>
        )
      ) : listings.length === 0 ? (
        <h2 className="text-xl text-center mt-24 font-bold mb-4 w-full">
          {noListingsMessage}
        </h2>
      ) : (
        <>
          {isListView ? (
            <AnimatePresence>
              {" "}
              <motion.div
                initial={{ opacity: 0 }} // Start invisible
                animate={{ opacity: 1 }} // Animate in
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }} // Smooth transition timing
              >
                <ListingSort listings={listings} />
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mt-4"
                initial={{ opacity: 0 }} // Start invisible
                animate={{ opacity: 1 }} // Animate in
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }} // Smooth transition timing
              >
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onSave={() => handleSave(listing.id, listing.isSaved)}
                    isSaved={listing.isSaved}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </>
      )}
    </div>
  );
};
const ListingsPage: React.FC<ListingsPageProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ListingsPageContent {...props} />
  </Suspense>
);

export default ListingsPage;
