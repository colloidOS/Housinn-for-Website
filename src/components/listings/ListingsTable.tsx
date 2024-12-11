import React, { useEffect, useRef, useState } from "react";
import { ListingsTableProps } from "@/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useSaveListing from "@/hooks/useSaveListing";
import { toast } from "sonner";
import { useModal } from "@/context/ModalContext";
import { useDeleteListing } from "@/hooks/useDeleteListing";
import { EllipsisIcon } from "lucide-react";

const ListingTable: React.FC<ListingsTableProps> = ({
  listing,
  useMyListings,
}) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(listing.isSaved); // Track saved state locally
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { deleteListing, deleteLoading } = useDeleteListing(listing.id);
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setDropdownOpen(!dropdownOpen);
    console.log("triggered");
  };

  const { openModal, closeModal } = useModal();
  const handleUpdate = () => {
    router.push(`/dashboard/update-listing?id=${listing.id}`);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleDelete = () => {
    openModal(
      <div>
        <h2 className="text-lg font-semibold mb-4">Delete Listing</h2>
        <p className="text-sm text-gray-700 mb-6">
          Are you sure you want to delete the listing titled "{listing.title}"?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => {
              deleteListing();
              closeModal();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };
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
        className="relative cursor-pointer px-4 mb-4 pt-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {useMyListings ? (
          <span
            ref={dropdownRef}
            onClick={toggleDropdown}
            className={`${
              dropdownOpen ? "rotate-90" : "rotate-0"
            } duration-500 transition-all bg-white rounded-full text-xs `}
          >
            <EllipsisIcon
              className={`${
                dropdownOpen ? "rotate-90" : "rotate-0"
              } duration-500 transition-all h-4 w-4`}
            />
          </span>
        ) : (
          <span
            onClick={handleSave}
            className="text-secondary  bg-white rounded-full place-items-center text-xs "
          >
            {isSaved ? <FaHeart /> : <FaRegHeart />}
          </span>
        )}
        {dropdownOpen && (
          <div
            className="absolute right-1 -bottom-20  bg-white border shadow-lg rounded-[7px] text-sm z-10"
            onClick={(e) => e.stopPropagation()} // Prevent menu clicks from triggering card click
          >
            <button
              className="block transition-colors duration-500 w-full px-4 py-2 hover:bg-secondary hover:text-white text-left"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="block w-full px-4 py-2 transition-colors duration-500 hover:bg-red-700 hover:text-white text-left"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ListingTable;
