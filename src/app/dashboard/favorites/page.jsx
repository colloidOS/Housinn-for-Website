import React from "react";
import ListingsPage from "../../../components/listings/ListingsPage";

function Favorites() {
  return (
    <ListingsPage
      getRoute="/users/profilePosts"
      dataRoute="savedPosts"
      pageTitle="Favorites"
      className="xl:px-12 text-gray-600 pt-10 px-5 pb-12 w-full"
      noListingsMessage="No Saved Listings"
    />
  );
}

export default Favorites;
