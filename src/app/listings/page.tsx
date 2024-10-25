"use client";
import ListingsPage from "@/components/listings/ListingsPage";
import Navbar from "@/components/Navbar";
import Wrapper from "@/components/ui/Wrapper";

const MyListings: React.FC = () => {
  return (
    <div>
      <Navbar colorScheme="alternate" />
      <Wrapper className="py-2">
        <ListingsPage
          getRoute="/posts"
          dataRoute="posts"
          pageTitle="Listings"
          className=""
        />
      </Wrapper>
    </div>
  );
};

export default MyListings;
