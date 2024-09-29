import React from "react";
import ListingsPage from "../components/listings/ListingsPage";

function Favorites() {
  return (
    <ListingsPage
      getRoute="/posts/savedPosts/post"
      dataRoute="posts"
      pageTitle="Favorites"
    />
  );
}

export default Favorites;
