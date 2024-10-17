import React from "react";
import ListingsPage from "../../../components/listings/ListingsPage";

const MyListings: React.FC = () => {
  return (
    <ListingsPage
      getRoute="/users/profilePosts"
      dataRoute="userPosts"
      pageTitle="My Listings"
      className="xl:px-12 text-gray-600 pt-10 px-5 pb-12 w-full"
    />
  );
};

export default MyListings;
