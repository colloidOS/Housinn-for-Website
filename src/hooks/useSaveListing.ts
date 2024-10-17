import api from "@/lib/api"; // Adjust this import path based on your project structure
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner"; // Ensure you have the sonner library installed
import axios from "axios";

const useSaveListing = (listings: any[], setListings: React.Dispatch<React.SetStateAction<any[]>>) => {
  const { user } = useAuth();

  const saveListing = async (id: string, isSaved: boolean) => {
    if (!user) {
      toast.error("You need to sign in to save Listings.");
      return;
    }

    const updatedListings = listings.map((listing) =>
      listing.id === id ? { ...listing, isSaved: !isSaved } : listing
    );
    setListings(updatedListings);

    try {
      const payload = { postId: id };
      await api.post("/users/save", payload);
      // Show a success toast instead of alert (can use React Toastify or similar)
      if (isSaved) {
        toast.info("Listing unsaved.");
      } else {
        toast.info("Listing saved.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(`Error: ${errorMessage}`);
      }
      const rollbackListings = listings.map((listing) =>
        listing.id === id ? { ...listing, isSaved: isSaved } : listing
      );
      setListings(rollbackListings);
    }
  };

  return saveListing;
};

export default useSaveListing;
