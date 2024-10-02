import api from "@/lib/api"; // Adjust this import path based on your project structure
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner"; // Ensure you have the sonner library installed

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
        toast.success("Listing unsaved.");
      } else {
        toast.success("Listing saved.");
      }
    } catch (err) {
      console.error("Error saving listing:", err);
      toast.error("There was an error saving the listing.");
      // Rollback logic
      const rollbackListings = listings.map((listing) =>
        listing.id === id ? { ...listing, isSaved: isSaved } : listing
      );
      setListings(rollbackListings);
    }
  };

  return saveListing;
};

export default useSaveListing;
