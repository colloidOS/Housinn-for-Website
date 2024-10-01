"use client";
import React, { useState, useEffect } from "react";
import ListingsCard from "./ListingsCard";
import ListingsFilter from "./ListingsFilter";
import Image from "next/image";
import ListingSort from "./ListingSort";
import api from "../../../../lib/api";
import { useAuth } from "../../../../context/AuthContext";
import { TailSpin } from "react-loader-spinner"; // Import TailSpin loader
import { useRouter } from "next/navigation";
import { Listings } from "@/types";
import { GridView, ListView, Search } from "../../../../../public/icons";
import { ListingsPageProps } from "@/types";
import { toast } from "sonner";
import axios from "axios";

const ListingsPage: React.FC<ListingsPageProps> = ({
  getRoute,
  dataRoute,
  pageTitle,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>("all-properties");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(false);
  const [listings, setListings] = useState<Listings[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      setLoading(true); // Show loader before fetching
      try {
        const response = await api.get(getRoute); // Use the passed API route

        const data = response.data.data[dataRoute].map((post: any) => ({
          id: post.id,
          price: post.price,
          title: post.title,
          location: `${post.city}, ${post.state}, ${post.address}`,
          beds: post.bedroom,
          baths: post.bathroom,
          area: `${post.latitude} x ${post.longitude}`,
          imageUrl: post.images[0] || "/images/default-image.png",
          tag: post.type,
          listed: new Date(post.createdAt).toLocaleDateString(),
          category: post.category,
        }));
        setListings(data);
        console.log("Fetched data:", data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || error.message;
          console.error(
            "Submission Error:",
            error.response?.data || error.message
          );
          toast.error(`Error: ${errorMessage}`);
        }
      } finally {
        setLoading(false); // Hide loader after fetching
      }
    };

    fetchListings();
  }, [user, getRoute]); // Include getRoute as a dependency

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
    <div className="xl:px-12 text-gray-600 pt-10 px-5 pb-12 w-full">
      <div>
        <h1 className="font-bold text-2xl mb-4">{pageTitle}</h1>{" "}
        {/* Dynamic title */}
      </div>

      <div className="flex items-center gap-4 mb-5 justify-between w-full">
        <ListingsFilter
          activeTag={activeTag || ""}
          onChange={handleFilterChange}
        />
        <div className="flex relative items-center h-full">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="pl-7 flex flex-1  justify-end pr-1 p-2 h-11 border border-gray-300  rounded w-full placeholder:text-sm text-sm  placeholder:text-center"
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
        <div className="flex justify-center items-center min-h-[200px]">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#0D66B7"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredListings.map((listing) => (
                <ListingsCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListingsPage;
