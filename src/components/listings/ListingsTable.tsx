import React from "react";
import { ListingsTableProps } from "@/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ListingTable: React.FC<ListingsTableProps> = ({ listing }) => {
  const router = useRouter();

  const listingDetails = [
    listing.title,
    listing.tag,
    listing.price,
    listing.beds,
    listing.baths,
    listing.category,
    listing.listed,
  ];
  const handleCardClick = () => {
    router.push(`/listings/${listing.id}`);
  };

  return (
    <tr className="border-b text-sm cursor-pointer" onClick={handleCardClick}>
      {listingDetails.map((detail, index) => (
        <td
          key={index}
          className={`py-2 px-4  ${index === 6 ? "hidden md:flex" : ""}`}
        >
          {detail}
        </td>
      ))}
      <td
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="text-secondary cursor-pointer px-6"
      >
        {listing.isSaved ? <FaHeart /> : <FaRegHeart />}{" "}
      </td>
    </tr>
  );
};

export default ListingTable;
