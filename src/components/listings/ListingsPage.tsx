"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GridView, ListView, Search } from "../../../public/icons";
import { FilterValues, ListingsPageProps } from "@/types";
import useFetchListings from "@/hooks/useFetchListings";
import ListingCard from "@/components/listings/ListingsCard";
import useSaveListing from "@/hooks/useSaveListing";
import ListingsFilter from "./ListingsFilter";
import ListingSort from "./ListingSort";
import { Skeleton } from "@/components/ui/skeleton";

const ListingsPage: React.FC<ListingsPageProps> = ({
  getRoute,
  dataRoute,
  pageTitle,
  className = "",
  noListingsMessage = "No listings available",
}) => {
  const [activeTag, setActiveTag] = useState<string | null>("all-properties");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("viewMode") === "list";
    }
    return false; // Default to grid view if localStorage is not available
  });
  const [filters, setFilters] = useState<FilterValues>({}); // Correctly typed filters

  const router = useRouter();

  const applyFilters = (selectedFilters: FilterValues) => {
    console.log("this is it",selectedFilters)
    setFilters(selectedFilters);
  };

 // Construct the dynamic endpoint based on filters
const constructGetRoute = () => {
  const queryParams = new URLSearchParams();

  // Add filters to the query string if they have values
  if (filters.city) queryParams.append("city", filters.city);
  if (filters.category) queryParams.append("category", filters.category);
  if (filters.type) queryParams.append("type", filters.type);
  if (filters.bedroom) queryParams.append("bedroom", filters.bedroom);
  if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
  if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
  if (filters.title) queryParams.append("title", filters.title);
  if (filters.address) queryParams.append("address", filters.address);
  if (filters.bathroom) queryParams.append("bathroom", filters.bathroom);
  if (filters.state) queryParams.append("state", filters.state);
  if (filters.ownerType) queryParams.append("ownerType", filters.ownerType);

  const fullRoute = `${getRoute}?${queryParams.toString()}`;

  // Log the route to the console
  console.log("Constructed API Route:", fullRoute);

  return fullRoute;
};

  const { listings, loading, setListings } = useFetchListings(
    constructGetRoute(), // Pass dynamically constructed route
    dataRoute
  );

  const saveListing = useSaveListing(listings, setListings);
  const handleSave = (id: string, isSaved: boolean) => {
    saveListing(id, isSaved);
  };
  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
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

  const handleSearch = () => {
    return listings.filter((listing) => {
      const matchesTag =
        activeTag === "all-properties" || listing.tag === activeTag;

      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const matchesSearch = [
        listing.location || "",
        listing.price?.toString() || "",
        listing.beds?.toString() || "",
        listing.baths?.toString() || "",
        listing.area || "",
        listing.title || "",
        listing.tag || "",
        listing.category || "",
      ].some((field) => field.toLowerCase().includes(lowerCaseSearchTerm));

      return matchesTag && matchesSearch;
    });
  };

  const filteredListings = handleSearch();

  return (
    <div className={` ${className || ""}`}>
      <div>
        <h1 className="font-bold text-2xl mb-4">{pageTitle}</h1>{" "}
        {/* Dynamic title */}
      </div>

      <div className="flex items-center gap-8 mb-5 justify-between w-full">
        <ListingsFilter
          activeTag={activeTag || ""}
          onChange={handleFilterChange}
          applyFilters={applyFilters}
        />
        <div className="flex relative items-center flex-1  h-full">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="pr-2 text-right flex flex-1   p-2 h-11 border border-gray-300  rounded w-full placeholder:text-sm text-sm  placeholder:text-right "
          />
          <button className="rounded-[5px] absolute left-2">
            <Image
              src={Search}
              alt="search"
              width={20}
              height={20}
              className="cursor-pointer opacity-60"
            />
          </button>
        </div>
        <button onClick={toggleView}>
          {isListView ? (
            <Image
              src={GridView}
              alt="Grid view"
              width={86}
              height={44}
              className="cursor-pointer"
            />
          ) : (
            <Image
              src={ListView}
              alt="List view"
              width={86}
              height={44}
              className="cursor-pointer"
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
      ) : filteredListings.length === 0 ? (
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
                <ListingSort listings={filteredListings} />
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
                {filteredListings.map((listing) => (
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

export default ListingsPage;
