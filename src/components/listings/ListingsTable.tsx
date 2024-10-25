import React, { useState } from "react";
import { ListingsTableProps } from "@/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useSaveListing from "@/hooks/useSaveListing";
import { toast } from "sonner";

const ListingTable: React.FC<ListingsTableProps> = ({ listing }) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(listing.isSaved); // Track saved state locally
  const saveListing = useSaveListing([listing], () => {});
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str; // Return if the string is empty
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const listingDetails = [
    listing.title,
    capitalizeFirstLetter(listing.tag),
    listing.category,
    listing.price,
    listing.cityState,
    listing.beds,
    listing.baths,
    listing.listed,
  ];
  const handleCardClick = () => {
    router.push(`/listings/${listing.id}`);
  };
  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    try {
      await saveListing(listing.id, isSaved); // Save listing using the hook
      setIsSaved(!isSaved); // Toggle the saved state
    } catch (error) {
      toast.error("Failed to save listing."); // Handle any errors
    }
  };
  return (
    <tr className="border-b text-md cursor-pointer" onClick={handleCardClick}>
      {listingDetails.map((detail, index) => (
        <td key={index} className={`text-gray-600 px-4 mb-4  pt-4`}>
          {detail}
        </td>
      ))}
      <td
        className="text-secondary cursor-pointer px-4 mb-4 pt-4"
        onClick={handleSave}
      >
        {isSaved ? <FaHeart /> : <FaRegHeart />}{" "}
      </td>
    </tr>
  );
};

export default ListingTable;
