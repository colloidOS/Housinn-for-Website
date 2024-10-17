import React from "react";
import ListingsPage from "../../../components/listings/ListingsPage";

function Favorites() {
  return (
    <ListingsPage
      getRoute="/posts/savedPosts/post"
      dataRoute="posts"
      pageTitle="Favorites"
      className="xl:px-12 text-gray-600 pt-10 px-5 pb-12 w-full"
    />
  );
}

export default Favorites;
