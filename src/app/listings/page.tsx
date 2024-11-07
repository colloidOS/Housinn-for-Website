"use client";
import ListingsPage from "@/components/listings/ListingsPage";
import Navbar from "@/components/Navbar";
import Wrapper from "@/components/ui/Wrapper";

const MyListings: React.FC = () => {
  return (
    <div>
      <Navbar colorScheme="alternate" />
      <Wrapper disablePadding >
        <ListingsPage
          getRoute="/posts"
          dataRoute="posts"
          pageTitle="Listings"
          className="md:px-8"
        />
      </Wrapper>
    </div>
  );
};

export default MyListings;
