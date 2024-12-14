import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";

export const useDeleteListing = (id: string | null) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteListing = async () => {
    if (!id) return;

    try {
      await api.delete(`/posts/${id}`);
      toast.success("Listing deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete listing.");
    } finally {
      setDeleteLoading(true); // Set loading to true immediately
      console.log("Before timeout: deleteLoading =", deleteLoading); // May still show the previous value
      
      // Delay setting to false by 2 seconds
      setTimeout(() => {
        setDeleteLoading(false);
        console.log("After timeout: deleteLoading =", deleteLoading); // Will reflect the updated value on re-render
      }, 2000);
    }
  };

  return { deleteListing, deleteLoading };
};
