import React from "react";
import Image from "next/image";
import { whychooseusdetails } from "@/data/whyChooseUs";
import Wrapper from "@/components/ui/Wrapper";

const WhyChooseUs: React.FC = () => {
  return (
    <Wrapper className="flex flex-col gap-8 font-sans ">
      <div className="flex flex-col gap-3 w-full text-center ">
        <h1 className="font-semibold text-4xl text-secondary">
          Why Choose Us?
        </h1>
        <p className="font-semibold text-2xl text-primary">
          Get the best real estate services here at Housinn
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {whychooseusdetails.map((whychoosedetail, index) => (
          <div key={index} className="flex flex-col gap-8">
            <div className="flex gap-4 items-start">
              <Image
                src={whychoosedetail.image}
                width={40}
                height={40}
                alt={whychoosedetail.title}
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {whychoosedetail.title}
                </h2>
                <p className="text-base">{whychoosedetail.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default WhyChooseUs;
