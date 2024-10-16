import { AddNewListingFormData } from "@/types";
export type Listings = {
  isSaved: boolean;
  amenities: string;
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
  postDetail: {
    amenities: string[];
    // Other fields inside postDetail can be added as per your API response
    propertySize: string | null;
    income: string | null;
    pet: string | null;
    restaurant: string | null;
    school: string | null;
    desc: string | null;
    // etc.
  };
  user: {
    avatar: string;
    company: string;
    firstName: string;
    lastName: string;
  };
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
  applyFilters: (filters: Record<string, any>) => void; // Add this line
}
export interface ListingsTableProps {
  listing: Listing;
}
export interface ListingsSortProps {
  listings: Listing[]; // Receive listings as prop
  
}
export interface ListingsProps {
  shouldSlice?: boolean;
  getRoute: string; // Add this
  dataRoute: string; // Add this
}

export interface ListingsPageProps {
  getRoute: string; // Accept the API route as a prop
  dataRoute: string;
  pageTitle: string; // Title of the page
  className: string;
}

export interface AddNewListings {
  title: string;
  images: File[]; // Changed from FileList | null to File[]
  state: string;
  city: string;
  type: string;
  amenities: string[];
  propertySize: string;
  bedroom: string;
  bathroom: string;
  price: string;
  description: string;
  category: string;
  address: string;
  landmark: string;
}

export interface ListingsProps {
  shouldSlice?: boolean;
}
export interface UserNavbarProps {
  className?: string;
}
interface ListingsFilterModalProps {
  toggleModal: () => void;
  applyFilters: (filters: Record<string, any>) => void; // Add this line
}

export interface User {
  id: string;
  email: string;
  userType: string;
  avatar: string | null;
  number: string | null;
  firstName: string;
  lastName: string;
  state: string | null;
  town: string | null;
  address: string | null;
  position: string | null;
  company: string | null;
  isVerified: boolean;
  passwordResetToken: string | null;
  passwordResetExpiry: string | null;
  createdAt: string;
  chatIDs: string[];
  token: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
// Define the type for sideItems
export interface SideItem {
  route: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>; // icon is a React component with an optional className prop
  id: string;
}
export interface ListingsFilterProps {
  activeTag: string;
  onChange: (tag: string) => void;
  applyFilters: (filters: Record<string, any>) => void; // Add this line
}
export interface FilterValues {
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  state?: string;
  city?: string;
  featured?: string;
  status?: string;
  minSquareFeet?: string;
  maxSquareFeet?: string;
  dateListedFrom?: string;
  dateListedTo?: string;
}
