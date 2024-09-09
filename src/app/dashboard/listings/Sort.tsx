import React, { useState, useEffect } from "react";
import ListingListItem from "./ListingListItem"; // Your existing component to display each listing

// Define the structure of a listing (if not already defined elsewhere)
interface Listing {
  id: string;
  title: string;
  tag: string;
  price: number;
  listed: string;
  status: string;
}

// Define the props interface for Sort component
const Sort: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Listing;
    direction: "asc" | "desc";
  } | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("API_URL"); // Replace with your API URL
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []); // Fetch listings when the component mounts

  // Memoized sorted listings logic
  const sortedListings = React.useMemo(() => {
    let sortableListings = [...listings]; // Create a copy of listings for sorting

    if (sortConfig !== null) {
      sortableListings.sort((a, b) => {
        const fieldA = a[sortConfig.key];
        const fieldB = b[sortConfig.key];

        // Compare the field values and apply sorting based on the direction
        if (fieldA < fieldB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (fieldA > fieldB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableListings; // Return sorted or original listings
  }, [listings, sortConfig]);

  // Handle sorting request when header is clicked
  const requestSort = (key: keyof Listing) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get class names for sorting direction
  const getClassNamesFor = (key: keyof Listing) => {
    if (!sortConfig) {
      return "";
    }
    return sortConfig.key === key
      ? sortConfig.direction === "asc"
        ? "asc"
        : "desc"
      : "";
  };

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th
            className="py-2 px-4 cursor-pointer"
            onClick={() => requestSort("title")}
          >
            Property Title <span className={getClassNamesFor("title")}></span>
          </th>
          <th
            className="py-2 px-4 cursor-pointer"
            onClick={() => requestSort("tag")}
          >
            Category <span className={getClassNamesFor("tag")}></span>
          </th>
          <th
            className="py-2 px-4 cursor-pointer"
            onClick={() => requestSort("price")}
          >
            Price <span className={getClassNamesFor("price")}></span>
          </th>
          <th
            className="py-2 px-4 cursor-pointer"
            onClick={() => requestSort("listed")}
          >
            Date <span className={getClassNamesFor("listed")}></span>
          </th>
          <th
            className="py-2 px-4 cursor-pointer"
            onClick={() => requestSort("status")}
          >
            Status <span className={getClassNamesFor("status")}></span>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedListings.map((listing) => (
          <ListingListItem key={listing.id} listing={listing} />
        ))}
      </tbody>
    </table>
  );
};

export default Sort;
