import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"; // Import for Next.js optimized image handling
import {
  PhAddress,
  Bed,
  Bath,
  Camera,
  Government,
} from "../../../public/icons";
import { useRouter } from "next/navigation";
import { ListingsCardProps } from "@/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { EllipsisIcon } from "lucide-react";
import { useDeleteListing } from "@/hooks/useDeleteListing";

import { useModal } from "@/context/ModalContext";

// Combined Listing Card Component
const ListingCard: React.FC<ListingsCardProps> = ({
  listing,
  onSave,
  isSaved,
  useMyListings = false,
}) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { deleteListing, loading } = useDeleteListing(listing.id);
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setDropdownOpen(!dropdownOpen);
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

  const handleCardClick = (e: React.MouseEvent) => {
    if (isModalOpen) {
      e.stopPropagation(); // Stop event from propagating to prevent navigation
    } else {
      router.push(`/listings/${listing.id}`);
    }
  };
  // console.log("listingtag", listing.category)
  const getCategoryStyle = () => {
    switch (listing.category) {
      case "apartment":
        return "bg-teal-100 text-teal-600";
      case "land":
        return "bg-green-100 text-green-600";
      case "duplex":
        return "bg-yellow-100 text-yellow-600";
      case "office":
        return "bg-blue-100 text-blue-600";
      case "condo":
        return "bg-purple-100 text-purple-600";
      case "store":
        return "bg-pink-100 text-pink-600";
      default:
        return "bg-gray-100 text-gray-600"; // Fallback color
    }
  };
  return (
    <div
      className="relative rounded-md shadow-custom-property-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex relative gap-1  cursor-pointer ">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="rounded-t-md w-full h-36 md:h-40 lg:h-44 object-cover"
        />

        <div
          className={`text-[10px] lg:text-xs px-2 py-1 pr-4 clip-triangle-right absolute top-0 rounded-ss-md left-0 ${
            listing.tag === "sale"
              ? "bg-green-200 text-green-700"
              : listing.tag === "rent"
              ? "bg-blue-200 text-blue-700"
              : listing.tag === "shortlet"
              ? "bg-yellow-200 text-yellow-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {listing.tag === "sale"
            ? "For Sale"
            : listing.tag === "rent"
            ? "For Rent"
            : "Short-Let"}
        </div>

        {listing.ownerType === "public" ? (
          <div className=" w-12 h-5 absolute top-0 right-0">
            <Image
              src={Government}
              width={1}
              height={1}
              className="w-full h-full object-cover rounded-se-md"
              alt="government"
            />
          </div>
        ) : (
          ""
        )}
        <div className="absolute flex bottom-2 gap-1 left-2">
          <Image src={Camera} alt="Camera" width={15} height={15} />
          <p className="text-white text-xs">{listing.imageLength}</p>
        </div>
        {useMyListings ? (
          <span
            ref={dropdownRef}
            onClick={toggleDropdown}
            className={`${
              dropdownOpen ? "rotate-90" : "rotate-0"
            } duration-500 transition-all text-secondary p-1 bg-white rounded-full place-items-center text-xs absolute bottom-1 right-1`}
          >
            <EllipsisIcon className="h-4 w-4" />
          </span>
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onSave(listing.id); // Trigger save/unsave action
            }}
            className="text-secondary p-1 bg-white rounded-full place-items-center text-xs absolute bottom-1 right-1"
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
      </div>

      <div className="py-2 lg:py-4 mb-2 flex flex-col gap-[6px] lg:gap-3 px-3 lg:px-5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-primary font-semibold">
            {listing.price}
          </h3>
          <p
            className={`hidden md:flex p-1 w-fit px-2 rounded-md text-[10px] lg:text-xs ${getCategoryStyle()}`}
          >
            {listing.category}
          </p>
        </div>

        <p className="text-gray-700 text-sm font-medium w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {listing.title}
        </p>

        <div className="flex items-start gap-1">
          <Image src={PhAddress} width={15} height={15} alt="Address icon" />
          <p className="text-gray-500 text-xs">{listing.cityState}</p>
        </div>

        <div className="flex  gap-3 text-gray-500 text-xs">
          <div className="flex gap-1">
            <Image src={Bed} alt="Bed icon" width={15} height={15} />
            {listing.beds} Beds
          </div>

          <div className="flex gap-1">
            <Image src={Bath} alt="Bath icon" width={15} height={15} />
            {listing.baths} Baths
          </div>
        </div>

        <div className="flex  justify-between items-center">
          {" "}
          <div className="text-gray-500 text-xs">
            <p>{listing.listed}</p>
          </div>
          <p
            className={`flex md:hidden p-1 w-fit px-2 rounded-md text-[10px] lg:text-xs ${getCategoryStyle()}`}
          >
            {listing.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
