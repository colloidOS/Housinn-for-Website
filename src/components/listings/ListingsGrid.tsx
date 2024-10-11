import React from "react";
import { ListingsGridProps} from "@/types";

const ListingGrid: React.FC<ListingsGridProps> = ({ listing }) => {
  const listingDetails = [
    listing.title,
    listing.tag,
    listing.price,
    listing.beds,
    listing.baths,
    listing.area,
    listing.listed,
  ];

  return (
    <tr className="border-b text-sm">
      {listingDetails.map((detail, index) => (
        <td
          key={index}
          className={`py-2 px-4  ${index === 6 ? "hidden md:flex" : ""}`}
        >
          {detail}
        </td>
      ))}
    </tr>
  );
};

export default ListingGrid;
