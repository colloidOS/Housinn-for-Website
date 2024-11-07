"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams for dynamic routing in App Router
import ListingDetail from "./components/ListingDetail";
import api from "../../../lib/api";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

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
        setListing(response.data.data);
        console.log("dfghtrd", response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || error.message;
          toast.error(`Error: ${errorMessage}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  return (
    <div className=" w-full">
      {loading ? (
        <div className="flex flex-col  w-full p-4 gap-4">
          {/* <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#002A50"
            ariaLabel="tail-spin-loading"
            radius="1"
          /> */}
          <Skeleton className="h-[10vh] w-full rounded-[14px]" />
          <Skeleton className="rounded-[14px] h-[40vh] md:h-[45vh] lg:h-[50vh] w-full" />

          <div className="flex flex-col xl:flex-row gap-4">
            <Skeleton className="rounded-[14px] h-[20vh] xl:h-[40vh] md:h-[45vh] lg:h-[50vh] w-full" />{" "}
            <Skeleton className="rounded-[14px] h-[20vh] xl:h-[40vh] md:h-[45vh] lg:h-[50vh] w-full" />
          </div>
        </div>
      ) : listing ? (
        <ListingDetail listing={listing} />
      ) : (
        <p className="flex justify-center items-center w-full h-screen">
          Listing not found
        </p>
      )}
    </div>
  );
};

export default ListingDetailPage;
