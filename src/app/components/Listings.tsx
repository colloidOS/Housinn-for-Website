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

const Listings: React.FC<ListingsProps> = ({
  shouldSlice = true,
  getRoute,
  dataRoute,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [maxListings, setMaxListings] = useState<number>(6); // Default value
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
        setMaxListings(3); // For mobile and small tablets
      } else if (screenWidth < 1024) {
        setMaxListings(4); // For iPad Pro and laptops
      } else {
        setMaxListings(6); // For desktops
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
  console.log("lsdfgredcdfcdxcvgfrd", listings);
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row gap-2 justify-between mb-5">
        <h2 className="text-2xl font-bold">New Listings</h2>
        <ListingFilter
          activeTag={activeTag || ""}
          onChange={handleFilterChange}
        />
      </div>

      {error ? (
        <div className="w-full text-center py-12">
          {" "}
          <p>Error fetching listings.</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-96">
          <TailSpin visible={true} height="80" width="80" color="#002A50" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-3 gap-6 mt-4">
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
        </div>
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
