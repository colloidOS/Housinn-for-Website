import { useState } from "react";
import { toast } from "sonner";

import api from "@/lib/api";
import { useRouter } from "next/router";

export const useDeleteListing = (id: string | null) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteListing = async () => {
    if (!id) return;

    try {
      setDeleteLoading(true);
      await api.delete(`/posts/${id}`);
      toast.success("Listing deleted successfully!");
      setDeleteLoading(false);
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete listing.");
    } finally {
    
      console.log("deleteloadingforhook", deleteLoading);
    }
  };

  return { deleteListing, deleteLoading };
};
