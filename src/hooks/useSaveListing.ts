import api from "@/lib/api"; // Adjust this import path based on your project structure

const useSaveListing = () => {
  const saveListing = async (id: string) => {
    try {
      const payload = { postId: id };
      await api.post("/users/save", payload);
      // Show a success toast instead of alert (can use React Toastify or similar)
      console.log("Listing saved successfully!");
    } catch (err) {
      console.error("Error saving listing:", err);
      throw err; // Re-throw error for the component to handle if needed
    }
  };

  return saveListing;
};

export default useSaveListing;
