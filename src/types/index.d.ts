import { AddNewListingFormData } from "@/types";
export type Listings = {
  isSaved: boolean;
  amenities: string;
  id: string;
  price: number;
  title: string;
  location: string;
  cityState: string;
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
  ownerType: string;
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
  userId: string;
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
  constructGetRoute: (filters: FilterValues) => void;
  onChange: (tag: string) => void;
  // applyFilters: (filters: Record<string, any>) => void; // Add this line
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
  searchTerm?: string;
  dataRoute: string; // Add this
}

export interface ListingsPageProps {
  getRoute: string; // Accept the API route as a prop
  dataRoute: string;
  pageTitle: string; // Title of the page
  className?: string;
  noListingsMessage?: string;
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
export interface UpdateListings {
  title: string;
  images: File[]; // Array of files for images
  state: string;
  city: string;
  type: string;
  propertySize: string;
  bedroom: string;
  bathroom: string;
  price: string;
  category: string;
  address: string;
  landmark: string;
  postDetail: {
    amenities: string[];
    desc: string;
  };
}


export interface ListingsProps {
  shouldSlice?: boolean;
}
export interface UserNavbarProps {
  className?: string;
}
interface ListingsFilterModalProps {
  toggleModal: () => void;
  applyFilters: (filters: FilterType) => void;
  initialFilters: FilterType;
  handleResetFilters: () => void;
}
export type FilterType = {
  minPrice?: string;
  title?: string;
  address?: string;
  maxPrice?: string;
  type?: string;
  bedroom?: string;
  bathroom?: string;
  state?: string;
  city?: string;
  category?: string;
  ownerType?: string;
};

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
export interface ListingFilterProps {
  activeTag: string;
  onChange: (tag: string) => void;
}
export interface FilterValues {
  minPrice?: string;
  maxPrice?: string;
  bedroom?: string;
  bathroom?: string;
  category?: string;
  type?: string;
  state?: string;
  city?: string;
  featured?: string;
  status?: string;
  minSquareFeet?: string;
  maxSquareFeet?: string;
  dateListedFrom?: string;
  dateListedTo?: string;
  title?: string;
  address?: string;
  ownerType?: string;
}
export interface ImageGalleryProps {
  images: string[]; // Array of image URLs
  currentImage: string | null;
  currentIndex: number; // Add this prop to handle the starting index
}
