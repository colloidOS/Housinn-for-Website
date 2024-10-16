"use client";
import React, { useState } from "react";
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
  className,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>("all-properties");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(false);
  const [filters, setFilters] = useState({}); // Store selected filters
  const router = useRouter();

  const { listings, loading, setListings } = useFetchListings(
    getRoute,
    dataRoute
  ); // Use the custom hook
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
    setIsListView(!isListView);
  };

  const applyFilters = (selectedFilters: FilterValues) => {
    console.log("Filters received in ListingsPage: ", selectedFilters);
    setFilters(selectedFilters);
  };

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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 mt-4"
          initial={{ opacity: 1 }} // Starting with full opacity
          animate={{ opacity: 0.3 }} // Animate out
          exit={{ opacity: 0.2 }}
        >
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-96 rounded-[7px] cursor-pointer bg-gray-300"
              />
            ))}
        </motion.div>
      ) : filteredListings.length === 0 ? (
        <div className="flex justify-center items-center flex-col mt-24 w-full">
          <h2 className="text-xl font-bold mb-4">No listings available</h2>
          <button
            className="bg-secondary text-white px-6 py-2 rounded transition"
            onClick={() => router.push("/dashboard/add-new-listing")}
          >
            Add New Listing
          </button>
        </div>
      ) : (
        <>
          {isListView ? (
            <ListingSort listings={filteredListings} />
          ) : (
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
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
