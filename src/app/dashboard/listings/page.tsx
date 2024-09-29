import React, { useState, useEffect } from "react";
import ListingsPage from "../components/listings/ListingsPage";

const MyListings: React.FC = () => {
  // const [activeTag, setActiveTag] = useState<string | null>("all-properties");
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const [isListView, setIsListView] = useState<boolean>(false);
  // const [listings, setListings] = useState<Listings[]>([]);
  // const [loading, setLoading] = useState<boolean>(true); // State for loading
  // const { user } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   const fetchListings = async () => {
  //     if (!user) {
  //       console.error("User not authenticated.");
  //       return;
  //     }

  //     setLoading(true); // Show loader before fetching
  //     try {
  //       const response = await api.get("/users/profilePosts");
  //       const data = response.data.data.userPosts.map((post: any) => ({
  //         id: post.id,
  //         price: post.price,
  //         title: post.title,
  //         location: `${post.city}, ${post.state}, ${post.address}`,
  //         beds: post.bedroom,
  //         baths: post.bathroom,
  //         area: `${post.latitude} x ${post.longitude}`,
  //         imageUrl: post.images[0] || "/images/default-image.png",
  //         tag: post.type,
  //         listed: new Date(post.createdAt).toLocaleDateString(),
  //         category: post.category,
  //       }));
  //       setListings(data);
  //       console.log("Fetched data:", data);
  //     } catch (error) {
  //       console.error("Error fetching listings:", error);
  //     } finally {
  //       setLoading(false); // Hide loader after fetching
  //     }
  //   };

  //   fetchListings();
  // }, [user]);

  // const handleFilterChange = (tag: string) => {
  //   setActiveTag(tag === activeTag ? null : tag);
  // };

  // const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value.toLowerCase());
  // };

  // const toggleView = () => {
  //   setIsListView(!isListView);
  // };

  // const handleSearch = () => {
  //   return listings.filter((listing) => {
  //     const matchesTag =
  //       activeTag === "all-properties" || listing.tag === activeTag;

  //     const lowerCaseSearchTerm = searchTerm.toLowerCase();

  //     const matchesSearch = [
  //       listing.location || "",
  //       listing.price?.toString() || "",
  //       listing.beds?.toString() || "",
  //       listing.baths?.toString() || "",
  //       listing.area || "",
  //       listing.title || "",
  //       listing.tag || "",
  //       listing.category || "",
  //     ].some((field) => field.toLowerCase().includes(lowerCaseSearchTerm));

  //     return matchesTag && matchesSearch;
  //   });
  // };

  // const filteredListings = handleSearch();

  return (
    <ListingsPage
      getRoute="/users/profilePosts"
      dataRoute="userPosts"
      pageTitle="My Listings"
    />
  );
};

export default MyListings;
