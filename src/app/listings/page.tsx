"use client";
import React, { useState, useEffect } from "react";
import ListingCard from "../../components/listings/ListingCard";
import ListingFilter from "../../components/listings/ListingFilter";
import api from "../../lib/api"; // Assuming you have an API utility like Axios for requests
import { TailSpin } from "react-loader-spinner";

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
  category: string;
};

const Listings: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await api.get("/posts");
        console.log("response: ", response.data.data.posts);
        const data = response.data.data.posts.map((post: any) => ({
          id: post.id,
          price: post.price,
          title: post.title,
          location: `${post.city}, ${post.state}, ${post.address}`,
          beds: post.bedroom,
          baths: post.bathroom,
          area: `${post.latitude} x ${post.longitude}`,
          imageUrl: post.images[0] || "/images/default-image.png",
          tag: post.type, // Ensure the `tag` corresponds to 'sale', 'rent', 'shortlet'
          listed: new Date(post.createdAt).toLocaleDateString(),
          category: post.category,
        }));
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleSave = async (id: string) => {
    try {
      const payload = { postId: id }; // Format the data as required
      await api.post("/users/save", payload); // Send the POST request with formatted data
      alert("Listing saved successfully!");
    } catch (error) {
      console.error("Error saving listing:", error);
      alert("Failed to save listing.");
    }
  };

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag);
  };

  const filteredListings = activeTag
    ? listings.filter((listing) => listing.tag === activeTag)
    : listings;

  return (
    <div className="lg:px-[104px] sm:px-14 px-6 pt-9 pb-12 w-full">
      <div className="flex flex-col md:flex-row gap-2 justify-between mb-5">
        <h2 className="text-2xl font-bold">New Listings</h2>
        <ListingFilter
          activeTag={activeTag || ""}
          onChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#002A50"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 mt-4">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
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
    </div>
  );
};

export default Listings;
