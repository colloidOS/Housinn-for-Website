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