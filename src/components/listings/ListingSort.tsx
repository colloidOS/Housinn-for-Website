// Sort.tsx
import React, { useState } from "react";
import { Listings, ListingsSortProps } from "@/types";
import ListingTable from "./ListingsTable";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
type Column<T> = {
  key: keyof T;
  label: string;
  hidden?: boolean; // Optional property for hidden columns
};
const ListingSort: React.FC<ListingsSortProps> = ({
  listings,
  useMyListings = false,
}) => {
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
  const columns: Column<Listings>[] = [
    { key: "title", label: "Property Title" },
    { key: "tag", label: "Type" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "cityState", label: "Location" },
    { key: "beds", label: "Bed" },
    { key: "baths", label: "Bath" },
    { key: "listed", label: "Date", hidden: true }, // Add hidden flag for responsive design
    { key: "isSaved", label: useMyListings ? "Opt" : "Fav" },
  ];

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200 text-left">
          {columns.map(({ key, label, hidden }) => (
            <th
              key={key}
              className={`py-2 px-4 cursor-pointer ${
                hidden ? "hidden md:flex" : ""
              }`}
              onClick={() => requestSort(key)}
            >
              <div className="flex items-center gap-2">
                {label}{" "}
                <span>
                  {sortConfig?.key === key && sortConfig.direction === "asc" ? (
                    <IoIosArrowUp />
                  ) : sortConfig?.key === key &&
                    sortConfig.direction === "desc" ? (
                    <IoIosArrowDown />
                  ) : null}
                </span>
              </div>
              <span className={getClassNamesFor(key)}></span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedListings.map((listing) => (
          <ListingTable
            key={listing.id}
            listing={listing}
            useMyListings={useMyListings}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ListingSort;
