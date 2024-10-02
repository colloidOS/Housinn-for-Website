import React from "react";
import Listings from "../components/Listings";

const ListingsPage = () => {
  return (
    <div>
      <Listings shouldSlice={false} getRoute="/posts" dataRoute="posts"/>
    </div>
  );
};

export default ListingsPage;
