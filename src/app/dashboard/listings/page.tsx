"use client"
import React from "react";
import ListingsPage from "../../../components/listings/ListingsPage";

const MyListings: React.FC = () => {
  return (
    <ListingsPage
      getRoute="/users/profilePosts"
      dataRoute="userPosts"
      pageTitle="My Listings"
      className="xl:px-12 text-gray-600 pt-5 px-3 pb-12 w-full"
      
    />
  );
};

export default MyListings;
