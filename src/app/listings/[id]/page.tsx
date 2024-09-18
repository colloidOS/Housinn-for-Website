"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams for dynamic routing in App Router
import ListingDetail from "./components/ListingDetail";
import api from "../../../lib/api";
import { TailSpin } from "react-loader-spinner";

const ListingDetailPage: React.FC = () => {
  const params = useParams(); // Get the dynamic id from params
  const id = params.id;

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Ensure id is available before making the request

    const fetchListing = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        console.log("response", response.data.data.postDetail);
        setListing(response.data.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#002A50"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-[104px] pt-9 pb-12 w-full">
      {listing ? <ListingDetail listing={listing} /> : <p>Listing not found</p>}
    </div>
  );
};

export default ListingDetailPage;
