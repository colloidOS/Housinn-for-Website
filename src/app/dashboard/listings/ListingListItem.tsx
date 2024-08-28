import React from "react";
import { Listing } from "../../../data/listings";

interface ListingListItemProps {
  listing: Listing;
}

const ListingListItem: React.FC<ListingListItemProps> = ({ listing }) => {
  return (
    <div className="flex items-center p-4 border-b">
      <img src={listing.imageUrl} alt={listing.title} className="w-32 h-32 rounded-lg mr-4" />
      <div>
        <h3 className="text-xl font-bold">{listing.title}</h3>
        <p className="text-gray-500">{listing.location}</p>
        <p className="text-primary">{listing.price}</p>
      </div>
    </div>
  );
};

export default ListingListItem;
