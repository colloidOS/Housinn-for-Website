import React from "react";

// Reuse the same Listing interface as defined in your Sort component
interface Listing {
  id: string;
  title: string;
  tag: string;
  price: number;
  listed: string;
  status: string;
}

interface ListingListItemProps {
  listing: Listing;
}

const ListingListItem: React.FC<ListingListItemProps> = ({ listing }) => {
  // Add a console log to check if listing data is passed correctly
  console.log("Listing data:", listing);
  

  return (
    <tr className="border-b text-[14px]">
      <td className="py-2 px-4">{listing.title}</td>
      <td className="py-2 px-4">{listing.tag}</td>
      <td className="py-2 px-4">₦ {listing.price}</td>
      <td className="py-2 px-4">{listing.listed}</td>
      <td className="py-2 px-4">
        <span
          className={`py-1 px-3 rounded-full text-xs ${
            listing.status === "Published"
              ? "bg-green-100 text-green-800"
              : listing.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : listing.status === "Unpublished"
              ? "bg-red-100 text-red-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {listing.status}
        </span>
      </td>
    </tr>
  );
};

export default ListingListItem;
