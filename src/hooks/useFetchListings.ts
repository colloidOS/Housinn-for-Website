import { useState, useEffect } from "react";
import api from "@/lib/api"; // Adjust this import path based on your project structure
import { Listing } from "@/types/listing";

const useFetchListings = (endpoint: string) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await api.get(endpoint);
        const data = response.data.data.posts.map((post: any) => ({
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
      } catch (err) {
        setError("Failed to fetch listings");
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [endpoint]);

  return { listings, loading, error };
};

export default useFetchListings;
