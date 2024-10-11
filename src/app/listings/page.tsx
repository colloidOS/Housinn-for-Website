import ListingsPage from "@/components/listings/ListingsPage";
import Wrapper from "@/components/ui/Wrapper";


const MyListings: React.FC = () => {
  return (
    <Wrapper>
      <ListingsPage
        getRoute="/posts"
        dataRoute="posts"
        pageTitle="Listings"
        className=""
      />
    </Wrapper>
  );
};

export default MyListings;
