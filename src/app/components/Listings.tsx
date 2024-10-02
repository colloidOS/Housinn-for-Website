"use client";
import React, { useState } from "react";
import ListingCard from "../../components/listings/ListingsCard";
import ListingFilter from "../../components/listings/ListingFilter";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import useFetchListings from "../../hooks/useFetchListings";
import useSaveListing from "../../hooks/useSaveListing";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Wrapper from "@/components/ui/Wrapper";
import { ListingsProps } from "@/types";
import { toast } from "sonner";

const Listings: React.FC<ListingsProps> = ({
  shouldSlice = true,
  getRoute,
  dataRoute,
})  => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { listings, loading, error, setListings } = useFetchListings(
    getRoute,
    dataRoute
  );
  const saveListing = useSaveListing();
  const router = useRouter();
  const { user } = useAuth();

  const handleViewAllListings = () => {
    router.push("/listings");
  };

  const handleSave = async (id: string, isSaved: boolean) => {
    if (!user) {
      toast.error("You need to sign in to save Listings.");
      return;
    }

    const updatedListings = listings.map((listing) =>
      listing.id === id ? { ...listing, isSaved: !isSaved } : listing
    );
    setListings(updatedListings);

    try {
      await saveListing(id);
      if (isSaved) {
        toast.success("Listing unsaved.");
      } else {
        toast.success("Listing saved.");
      }
    } catch (error) {
      toast.error("There was an error saving the listing.");
      const rollbackListings = listings.map((listing) =>
        listing.id === id ? { ...listing, isSaved: isSaved } : listing
      );
      setListings(rollbackListings);
    }
  };

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag);
  };

  const filteredListings = activeTag
    ? listings.filter((listing) => listing.tag === activeTag)
    : listings;

  // Conditionally slice the listings if shouldSlice is true
  const displayedListings = shouldSlice
    ? filteredListings.slice(0, 6)
    : filteredListings;

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
       <div className="w-full text-center py-12"> <p>Error fetching listings.</p></div>
      ) : loading ? (
        <div className="flex justify-center items-center h-96">
          <TailSpin visible={true} height="80" width="80" color="#002A50" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 mt-4">
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
