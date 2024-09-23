import React, { useState } from "react";
import ListingCard from "../../components/listings/ListingCard";
import ListingFilter from "../../components/listings/ListingFilter";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import useFetchListings from "../../hooks/useFetchListings"; // Custom hook for fetching listings
import useSaveListing from "../../hooks/useSaveListing";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Wrapper from "@/components/ui/Wrapper";


const Listings: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { listings, loading, error } = useFetchListings("/posts");
  const saveListing = useSaveListing();
  const router = useRouter();

  const handleViewAllListings = () => {
    router.push("/listings"); // Navigate to /listings on button click
  };

  const handleSave = async (id: string) => {
    try {
      await saveListing(id);
    } catch (error) {
      console.error("Error saving listing:", error);
    }
  };

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag);
  };

  const filteredListings = activeTag
    ? listings.filter((listing) => listing.tag === activeTag)
    : listings;

  if (error) {
    return <p>Error fetching listings.</p>;
  }
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row gap-2 justify-between mb-5">
        <h2 className="text-2xl font-bold">New Listings</h2>
        <ListingFilter
          activeTag={activeTag || ""}
          onChange={handleFilterChange}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <TailSpin visible={true} height="80" width="80" color="#002A50" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 mt-4">
          {filteredListings.length > 0 ? (
            filteredListings
              .slice(0, 6)
              .map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onSave={handleSave}
                />
              ))
          ) : (
            <p>No listings found</p>
          )}
        </div>
      )}

      <div className="w-full flex justify-center">
        <PrimaryButton
          disabled={loading}
          onClick={handleViewAllListings}
          className="mt-8 px-4 py-2"
        >
          View all Listings
        </PrimaryButton>
      </div>
    </Wrapper>
  );
};

export default Listings;
