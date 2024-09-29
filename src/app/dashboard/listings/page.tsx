import React from "react";
import ListingsPage from "../components/listings/ListingsPage";

const MyListings: React.FC = () => {
  return (
    <ListingsPage
      getRoute="/users/profilePosts"
      dataRoute="userPosts"
      pageTitle="My Listings"
    />
  );
};

export default MyListings;
