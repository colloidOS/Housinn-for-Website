import React from "react";
import WhyChooseUs from "../app/components/WhyChooseUs";
import Reviews from "../app/components/Reviews";

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
