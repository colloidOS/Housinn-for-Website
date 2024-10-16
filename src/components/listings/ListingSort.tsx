// Sort.tsx
import React, { useState } from "react";
import ListingGrid from "./ListingsTable";
import { Listings, ListingsSortProps } from "@/types";

const ListingSort: React.FC<ListingsSortProps> = ({ listings }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Listings;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedListings = React.useMemo(() => {
    let sortableListings = [...listings];

    if (sortConfig !== null) {
      sortableListings.sort((a, b) => {
        const fieldA = a[sortConfig.key];
        const fieldB = b[sortConfig.key];

        if (fieldA < fieldB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (fieldA > fieldB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableListings;
  }, [listings, sortConfig]);

  const requestSort = (key: keyof Listings) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (key: keyof Listings) => {
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
            onClick={() => requestSort("beds")}
          >
            Bed <span className={getClassNamesFor("beds")}></span>
          </th>
          <th
            className="py-2 px-4 cursor-pointer"
            onClick={() => requestSort("baths")}
          >
            Bath <span className={getClassNamesFor("baths")}></span>
          </th>
          <th
            className="py-2 px-4 cursor-pointer"
            onClick={() => requestSort("area")}
          >
            Area <span className={getClassNamesFor("area")}></span>
          </th>
          <th
            className="py-2 px-4 cursor-pointer hidden md:flex"
            onClick={() => requestSort("listed")}
          >
            Date <span className={getClassNamesFor("listed")}></span>
          </th>

          {/* <th
            className="py-2 px-4 cursor-pointer"
            onClick={() => requestSort("status")}
          >
            Status <span className={getClassNamesFor("status")}></span>
          </th> */}
        </tr>
      </thead>
      <tbody>
        {sortedListings.map((listing) => (
          <ListingGrid key={listing.id} listing={listing} />
        ))}
      </tbody>
    </table>
  );
};

export default ListingSort;
