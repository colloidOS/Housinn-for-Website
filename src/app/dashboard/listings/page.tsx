"use client";
import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import Search from "../../../../public/icons/search-listing.svg";
import Grid_view from "../../../../public/icons/grid-view.svg";
import List_view from "../../../../public/icons/list-view.svg";
import Filter from "./Filter";
import Image from "next/image";
import Sort from "./Sort";
import api from "../../../lib/api"; // Import the axios instance
import { useAuth } from "../../../context/AuthContext"; // Import useAuth to get user data

// Define the Listing type
type Listing = {
  id: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  imageUrl: string;
  tag: string;
  listed: string;
  status: string;
};

const ListingsPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>("All Properties");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const { user } = useAuth(); // Access user from AuthContext

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      try {
        const response = await api.get("/users/profilePosts");
        const data = response.data.data.userPosts.map((post: any) => ({
          id: post.id,
          price: `₦${post.price.toLocaleString()}`, // Format price
          title: post.title,
          location: `${post.city}, ${post.state}, ${post.address}`,
          beds: post.bedroom,
          baths: post.bathroom,
          area: `${post.latitude} x ${post.longitude}`, // Example of area
          imageUrl: post.images[0] || "/images/default-image.png", // Default image if none provided
          tag: post.category === "apartment" ? "For Rent" : "For Sale", // Example mapping
          listed: new Date(post.createdAt).toLocaleDateString(),
          status: "Published", // Example default status
        }));
        setListings(data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [user]); // Ensure it runs after user is set

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
    <div className="px-12 text-gray-600 pt-10 pb-12 w-full">
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
                width={86}
                height={44}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src={List_view}
                alt="image"
                width={60}
                height={44}
                className="cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>

      {isListView ? (
        <Sort listings={filteredListings} />
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
