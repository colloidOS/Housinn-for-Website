import { useState, useEffect } from "react";
import api from "@/lib/api"; // Adjust this import path based on your project structure
import { Listings } from "@/types";
import axios from "axios";
import { toast } from "sonner";

const useFetchListings = (endpoint: string, dataRoute: string, searchTerm?: string) => {
  const [listings, setListings] = useState<Listings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str; // Return if the string is empty
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
console.log("searvchterm", searchTerm)
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const responsePath= `${endpoint}searchText=${searchTerm}`
        console.log("response", responsePath)
        const response = await api.get(responsePath);
        console.log("response.data", response.data.data);
        const data = response.data.data[dataRoute].map((post: any) => ({
          id: post.id,
          price: `₦${Number(post.price).toLocaleString()}`,
          title: `${capitalizeFirstLetter(post.title)} `,
          cityState: `${capitalizeFirstLetter(
            post.city
          )}, ${capitalizeFirstLetter(post.state)}.`,
          location: ` ${capitalizeFirstLetter(
            post.address
          )}, ${capitalizeFirstLetter(post.city)}, ${capitalizeFirstLetter(
            post.state
          )}.`,

          beds: post.bedroom,
          baths: post.bathroom,
          imageUrl: post.images[0] || "/images/default-image.png",
          tag: post.type,
          desc: post.desc,
          ownerType: post.ownerType,
          listed: new Date(post.createdAt).toLocaleDateString(),
          category: post.category,
          isSaved: post.isSaved || null,
          imageLength: post.images.length,
        }));
        console.log("this data", data);
        setListings(data);
      } catch (err) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || error.message;
          toast.error(`Error: ${errorMessage}`);
        }
        setError("Failed to fetch listings");
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [endpoint, searchTerm]);

  return { listings, setListings, loading, error };
};

export default useFetchListings;
