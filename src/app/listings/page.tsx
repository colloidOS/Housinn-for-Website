"use client";
import ListingsPage from "@/components/listings/ListingsPage";
import Navbar from "@/components/Navbar";
import Wrapper from "@/components/ui/Wrapper";

const MyListings: React.FC = () => {
  return (
    <div>
      <Navbar heroAnimated colorScheme="alternate" />
      <Wrapper disablePadding >
        <ListingsPage
          getRoute="/posts"
          dataRoute="posts"
          pageTitle="Listings"
          className="md:px-8 pb-8"
        />
      </Wrapper>
    </div>
  );
};

export default MyListings;

// "use client";

// import ListingsPage from "@/components/listings/ListingsPage";
// import Navbar from "@/components/Navbar";
// import Wrapper from "@/components/ui/Wrapper";
// import { useSearchParams } from "next/navigation";

// const MyListings: React.FC = () => {
//   const searchParams = useSearchParams();
//   const searchTerm = searchParams.get("search"); // Get 'search' term from query

//   // Dynamically update the `getRoute` based on the search term
//   const getRoute = searchTerm
//     ? `/posts?searchText=${encodeURIComponent(searchTerm)}`
//     : "/posts";

//   return (
//     <div>
//       <Navbar colorScheme="alternate" />
//       <Wrapper disablePadding>
//         <ListingsPage
//           getRoute={getRoute} // Pass the dynamic route
//           dataRoute="posts"
//           pageTitle="Listings"
//           className="md:px-8"
//         />
//       </Wrapper>
//     </div>
//   );
// };

// export default MyListings;
