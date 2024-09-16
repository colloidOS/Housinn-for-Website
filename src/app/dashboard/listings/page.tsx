"use client";
// ListingsPage.tsx
import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import Search from "../../../../public/icons/search-listing.svg";
import Grid_view from "../../../../public/icons/grid-view.svg";
import List_view from "../../../../public/icons/list-view.svg";
import Filter from "./Filter";
import Image from "next/image";
import Sort from "./Sort";
import api from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";

type Listing = {
  id: string;
  price: number;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  imageUrl: string;
  tag: string;
  listed: string;
  status: string;
  category:string;
};

const ListingsPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>("All Properties");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListView, setIsListView] = useState<boolean>(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const { user } = useAuth();

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
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [user]);

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
        listing.location || "", // Ensure location is not null
        listing.price?.toString() || "", // Convert price to string
        listing.beds?.toString() || "", // Convert beds to string, handle null values
        listing.baths?.toString() || "", // Convert baths to string, handle null values
        listing.area || "", // Handle area, even if it's "null x null"
        listing.title || "", // Handle title, even if it's null
        listing.tag || "", // Handle tag if null
        listing.category || "", // Handle category if null
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
          <button onClick={toggleView}>
            {isListView ? (
              <Image
                src={Grid_view}
                alt="Grid view"
                width={86}
                height={44}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src={List_view}
                alt="List view"
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
