import React from "react";
import Image from "next/image"; // Import for Next.js optimized image handling
import {
  PhAddress,
  Bed,
  Bath,
  Feet,
  Camera,
  Menu,
  Government,
} from "../../../public/icons";
import { useRouter } from "next/navigation";
import { ListingsCardProps } from "@/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Span } from "next/dist/trace";

// Combined Listing Card Component
const ListingCard: React.FC<ListingsCardProps> = ({
  listing,
  onSave,
  isSaved,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/listings/${listing.id}`);
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
        <span
          onClick={(e) => {
            e.stopPropagation();
            onSave(listing.id); // Trigger save/unsave action
          }}
          className="  text-secondary  p-1 bg-white rounded-full place-items-center text-xs absolute bottom-1 right-1"
        >
          {isSaved ? <FaHeart /> : <FaRegHeart />}
        </span>
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

        {/* {listing.beds && listing.baths ? (
          <div className="flex  gap-3 text-gray-500 text-xs">
            {" "}
            {listing.beds > 0 ? (
              <div className="flex gap-1">
                <Image src={Bed} alt="Bed icon" width={15} height={15} />
                {listing.beds} Beds
              </div>
            ) : (
              ""
            )}
            {listing.baths > 0 ? (
              <div className="flex gap-1">
                <Image src={Bath} alt="Bath icon" width={15} height={15} />
                {listing.baths} Baths
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )} */}
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
