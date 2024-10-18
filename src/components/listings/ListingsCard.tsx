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

  return (
    <div
      className="relative rounded-[7px] shadow-custom-property-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex relative gap-1  cursor-pointer ">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="rounded-t-[7px] w-full h-36 md:h-40 lg:h-44 object-cover"
        />
        <div className="absolute flex bottom-2 gap-1 left-2">
          <Image src={Camera} alt="Camera" width={15} height={15} />
          <p className="text-white text-xs">{listing.imageLength}</p>
        </div>

        <div
          className={`text-[10px] lg:text-xs px-2 py-1 pr-4 clip-triangle-right absolute top-0 rounded-ss-[7px] left-0 ${
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
          <div className=" w-16 h-6 absolute top-0 right-0">
            <Image
              src={Government}
              width={1}
              height={1}
              className="w-full h-full object-cover rounded-se-[7px]"
              alt="government"
            />
          </div>
        ) : (
          ""
        )}
        <p className="p-1 w-fit px-2 bg-gray-700 text-white text-[10px] lg:text-xs absolute bottom-0 right-0">
          {listing.category}
        </p>
      </div>

      <div className="py-2 lg:py-4 mb-2 flex flex-col gap-[6px] lg:gap-3 px-3 lg:px-5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-primary font-semibold">
            {listing.price}
          </h3>

          <div
            onClick={(e) => {
              e.stopPropagation();
              onSave(listing.id); // Trigger save/unsave action
            }}
            className="  text-secondary text-sm lg:text-lg"
          >
            {isSaved ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>

        <p className="text-gray-700 text-sm font-medium w-full overflow-hidden text-ellipsis whitespace-nowrap">{listing.title}</p>

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

        <div className="text-gray-500 text-xs">
          <p>{listing.listed}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
