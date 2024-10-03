import React, { useState } from "react";
import Image from "next/image";
import { Listings } from "@/types";
import {
  Bed,
  Feet,
  Bath,
  PhAddress,
  Sanrealtor,
} from "../../../../../public/icons";
interface ListingDetailProps {
  listing: Listings;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const location = ` ${listing.address}, ${listing.city}, ${listing.state}.`;
  const formattedPrice = `₦${Number(listing.price).toLocaleString()}`;

  const openGallery = (image?: string) => {
    if (image) {
      setCurrentImage(image);
    }
    setShowGallery(true);
  };
const desc=listin
  const closeGallery = () => {
    setShowGallery(false);
    setCurrentImage(null);
  };
  const renderAmenities = () => {
    if (!listing.postDetail || listing.postDetail.amenities.length === 0) {
      return <p>No amenities available</p>;
    }
  
    return (
      <div className="flex flex-wrap gap-4 mt-4">
        {listing.postDetail.amenities.map((amenity, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-full px-4 py-1 text-sm"
          >
            {amenity}
          </div>
        ))}
      </div>
    );
  };
  

  const renderImages = () => {
    const images = listing.images;

    if (images.length === 1) {
      return (
        <div className="h-full">
          <img
            src={images[0]}
            alt={listing.title}
            className="object-cover w-full h-full cursor-pointer"
            onClick={() => openGallery(images[0])}
          />
        </div>
      );
    } else if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 h-full gap-2">
          {images.slice(0, 2).map((image, index) => (
            <div key={index} className="h-full">
              <img
                src={image}
                alt={listing.title}
                className="object-cover w-full h-full cursor-pointer"
                onClick={() => openGallery(image)}
              />
            </div>
          ))}
        </div>
      );
    } else if (images.length >= 3) {
      return (
        <div className="grid grid-col-1 md:grid-cols-2 gap-2 md:h-96 ">
          <div className="col-span-1 h-48  md:h-96">
            <img
              src={images[0]}
              alt={listing.title}
              className="object-cover h-48 w-full  md:h-96 cursor-pointer"
              onClick={() => openGallery(images[0])}
            />
          </div>
          <div className="flex md:flex-col gap-2 h-96">
            <img
              src={images[1]}
              alt={listing.title}
              className="object-cover w-1/2 md:w-full h-48 cursor-pointer"
              onClick={() => openGallery(images[1])}
            />

            <div className="relative">
              <img
                src={images[2]}
                alt={listing.title}
                className="object-cover w-1/2 md:w-full h-48 cursor-pointer"
                onClick={() => openGallery(images[2])}
              />
              {images.length > 2 && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer"
                  onClick={() => openGallery()}
                >
                  <span>View More</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-screen p-3 flex flex-col gap-[0.875rem]">
      {/* Image Section */}
      <div className="h-1/2">{renderImages()}</div>

      {/* Listing Info Section */}
      <div className="flex gap-1 md:h-1/2">
        <div className="w-3/4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl text-primary font-bold">
              {formattedPrice}
            </h1>
            <h1 className="text-xl font-bold">{listing.title}</h1>
            <div className="flex gap-2">
              <Image src={PhAddress} alt="Address" width={20} height={20} />
              <p className="text-gray-500 text-[0.875rem]">{location}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1">
                <Image src={Bed} alt="Beds" width={20} height={20} />
                <span>{listing.bedroom} Beds</span>
              </div>
              <div className="flex gap-1">
                <Image src={Bath} alt="Baths" width={20} height={20} />
                <span>{listing.bathroom} Baths</span>
              </div>
              <div className="flex gap-1">
                <Image src={Feet} alt="Area" width={20} height={20} />
                <span>
                  {listing.latitude} x {listing.longitude} sq.ft
                </span>
              </div>
            </div>
          </div>
          <Image src={Sanrealtor} alt="logo" width={250} height={65} />
          <div>{renderAmenities()}</div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col h-full">
            <img
              src="/images/map.png"
              alt="Map"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="h-auto">
            <p className="text-[0.875rem]">{listing.desc}</p>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative w-full max-w-3xl h-full max-h-3xl">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-white">Image Gallery</h2>
              <button onClick={closeGallery} className="text-white">
                Close
              </button>
            </div>
            <div className="flex overflow-x-auto h-full">
              {listing.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={listing.title}
                  className="object-contain h-full w-auto cursor-pointer"
                  onClick={() => setCurrentImage(image)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
