// Export the Listing interface
export interface Listing {
  id: number;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  imageUrl: string;
  tag: "For Sale" | "For Rent" | "Short-let" | "Lands";
  listed: string; // Date when the listing was added
  status: "Published" | "Unpublished" | "Expired" | "Pending"; // Status of the listing
}

// Define the listings array
const listings: Listing[] = [
  {
    id: 1,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card-2.png",
    tag: "For Sale",
    listed: "10-11-2023",
    status: "Published",
  },
  {
    id: 2,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card-2.png",
    tag: "For Rent",
    listed: "10-11-2023",
    status: "Pending",
  },
  {
    id: 3,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card-2.png",
    tag: "Short-let",
    listed: "10-11-2023",
    status: "Unpublished",
  },
  {
    id: 4,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card-2.png",
    tag: "Lands",
    listed: "10-11-2023",
    status: "Expired",
  },
  {
    id: 5,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card-2.png",
    tag: "For Sale",
    listed: "10-11-2023",
    status: "Published",
  },
];

export { listings };
