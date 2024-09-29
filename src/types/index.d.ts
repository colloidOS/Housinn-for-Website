import { AddNewListingFormData } from "@/types";
export type Listings = {
  isSaved: boolean;
  id: string;
  price: number;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  imageUrl: string;
  tag: string;
  listed: string;
  status: string;
  category: string;
  city: string;
  state: string;
  address: string;
  bedroom: number;
  bathroom: number;
  latitude: number;
  longitude: number;
  images: string[];
  type: string;
  createdAt: string;
  category: string;
  desc: string;
};

export interface Review {
  image: string;
  name: string;
  location: string;
  message: string;
}

export interface ListingsCardProps {
  listing: Listing;
  onSave: (id: string) => void;
  isSaved: boolean;
}

export interface ListingsFilterProps {
  activeTag: string;
  onChange: (tag: string) => void;
}
export interface ListingsGridProps {
  listing: Listing;
}
export interface ListingsSortProps {
  listings: Listing[]; // Receive listings as prop
}
export interface ListingsProps {
  shouldSlice?: boolean; 
}

export interface ListingsPageProps {
  getRoute: string; // Accept the API route as a prop
  dataRoute: string;
  pageTitle: string; // Title of the page
}

export interface AddNewListingFormData {
  title: string;
  images: FileList | null;
  state: string;
  city: string;
  type: string;
  amenities: string[];
  propertySize: string;
  bedroom: string;
  price: string;
  description: string;
  category: string;
  address: string;
  landmark: string;
}
