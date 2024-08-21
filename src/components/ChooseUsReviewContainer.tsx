import React from "react";
import WhyChooseUs from "./WhyChooseUs";
import Reviews from "./Reviews";

const ChooseUsReviewContainer = () => {
  return (
    <section
      className="relative h-full bg-contain bg-center bg-repeat"
      style={{ backgroundImage: "url('/images/chooseus&review.png')" }}
    >
      <WhyChooseUs />
      <Reviews />
    </section>
  );
};

export default ChooseUsReviewContainer;
