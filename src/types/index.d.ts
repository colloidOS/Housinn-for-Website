export type Listing = {
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


export interface ListingCardProps {
  listing: Listing;
  onSave: (id: string) => void; 
}

export interface ListingFilterProps {
  activeTag: string;
  onChange: (tag: string) => void;
}
export interface ListingGridProps {
  listing: Listing;
}
export interface ListingSortProps {
  listings: Listing[]; // Receive listings as prop
}