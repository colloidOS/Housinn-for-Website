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
    imageUrl: "/images/property-card.png",
    tag: "For Sale",
  },
  {
    id: 2,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card.png",
    tag: "For Rent",
  },
  {
    id: 3,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card.png",
    tag: "Short-let",
  },
  {
    id: 4,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card.png",
    tag: "Lands",
  },
  {
    id: 5,
    price: "₦160,000,000",
    title: "Brand new Luxury 4 Bedroom duplex",
    location: "Abuja, Abuja FCT, Katampe Extension, KATAMPE EXTENSION",
    beds: 5,
    baths: 5,
    area: "580.00 ft²",
    imageUrl: "/images/property-card.png",
    tag: "For Sale",
  },
];
export { listings };
