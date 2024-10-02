import { useState, useEffect } from "react";
import api from "@/lib/api"; // Adjust this import path based on your project structure
import { Listings } from "@/types";

const useFetchListings = (endpoint: string, dataRoute: string) => {
  const [listings, setListings] = useState<Listings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await api.get(endpoint);
        console.log("response", response.data)
        const data = response.data.data[dataRoute].map((post: any) => ({
          id: post.id,
          price: post.price,
          title: post.title,
          location: ` ${post.address}, ${post.city}, ${post.state}`,
          beds: post.bedroom,
          baths: post.bathroom,
          area: `${post.latitude} x ${post.longitude}`,
          imageUrl: post.images[0] || "/images/default-image.png",
          tag: post.type,
          listed: new Date(post.createdAt).toLocaleDateString(),
          category: post.category,
          isSaved: post.isSaved,
        }));
        
        setListings(data);
      } catch (err) {
        setError("Failed to fetch listings");
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [endpoint]);

  return { listings, setListings, loading, error };
};

export default useFetchListings;
