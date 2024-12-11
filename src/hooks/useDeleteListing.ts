import { useState } from "react";
import { toast } from "sonner";

import api from "@/lib/api";
import { useRouter } from "next/router";

export const useDeleteListing = (id: string | null) => {
  const [loading, setLoading] = useState(false);

  const deleteListing = async () => {
    if (!id) return;

    try {
      setLoading(true);
      await api.delete(`/posts/${id}`);
      toast.success("Listing deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete listing.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteListing, loading };
};
