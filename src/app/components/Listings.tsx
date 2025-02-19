"use client";
import React, { useState, useEffect } from "react";
import ListingCard from "../../components/listings/ListingsCard";
import ListingFilter from "../../components/listings/ListingFilter";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import useFetchListings from "../../hooks/useFetchListings";
import useSaveListing from "../../hooks/useSaveListing";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Wrapper from "@/components/ui/Wrapper";
import { ListingsProps } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Listings: React.FC<ListingsProps> = ({
  shouldSlice = true,
  getRoute,
  dataRoute,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [maxListings, setMaxListings] = useState<number>(8); // Default value
  const { listings, loading, error, setListings } = useFetchListings(
    getRoute,
    dataRoute
  );
  const saveListing = useSaveListing(listings, setListings);
  const router = useRouter();
  const handleSave = (id: string, isSaved: boolean) => {
    saveListing(id, isSaved);
  };

  const handleViewAllListings = () => {
    router.push("/listings");
  };

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag);
  };

  const filteredListings = activeTag
    ? listings.filter((listing) => listing.tag === activeTag)
    : listings;

  // Conditionally slice the listings based on `shouldSlice`
  const displayedListings = shouldSlice
    ? filteredListings.slice(0, maxListings)
    : filteredListings;

  // Adjust the number of listings displayed based on screen width
  useEffect(() => {
    const updateMaxListings = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setMaxListings(4); // For mobile and small tablets
      } else if (screenWidth < 1024) {
        setMaxListings(6); // For iPad Pro and laptops
      } else {
        setMaxListings(8); // For desktops
      }
    };

    // Set initial value and listen for window resizing
    updateMaxListings();
    window.addEventListener("resize", updateMaxListings);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateMaxListings);
    };
  }, []);
  // Toast notification for error
  useEffect(() => {
    if (error) {
      toast.error("Error fetching listings");
    }
  }, [error]);
  console.log("lsdfgredcdfcdxcvgfrd", listings);
  const renderSkeletons = () => {
    return Array.from({ length: maxListings }).map((_, index) => (
      <Skeleton
        key={index}
        className="w-full h-80 rounded-[7px]  cursor-pointer bg-gray-300"
      />
    ));
  };
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row gap-2 justify-between mb-5">
        <h2 className="text-2xl font-bold">New Listings</h2>
        <ListingFilter
          activeTag={activeTag || ""}
          onChange={handleFilterChange}
        />
      </div>

      {error || loading ? (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mt-4"
          initial={{ opacity: 1 }} // Starting with full opacity
          animate={{ opacity: 0.3 }} // Animate out
          exit={{ opacity: 0.2 }}
        >
          {renderSkeletons()}
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mt-4"
            initial={{ opacity: 0 }} // Start invisible
            animate={{ opacity: 1 }} // Animate in
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} // Smooth transition timing
          >
            {displayedListings.length > 0 ? (
              displayedListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onSave={() => handleSave(listing.id, listing.isSaved)}
                  isSaved={listing.isSaved}
                />
              ))
            ) : (
              <p>No listings found</p>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {error
        ? ""
        : shouldSlice && (
            <div className="w-full flex justify-center">
              <PrimaryButton
                onClick={handleViewAllListings}
                className="mt-8 px-4 py-2"
              >
                View all Listings
              </PrimaryButton>
            </div>
          )}
    </Wrapper>
  );
};

export default Listings;
