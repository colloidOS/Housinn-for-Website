import React from "react";
import property from "../../../public/icons/property.png";
import line from "../../../public/icons/line.svg";
import Image from "next/image";

const AboutUs = () => {
  return (
    <>
      <div className="flex justify-center w-full bg-primary text-white/90 gap-[18px] py-5 px-11 lg:px-[104px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h3 className="text-[32px] font-semibold">About Us</h3>
            <p className="text-base lg:text-lg max-w-[800px] text-wrap">
              At Housinn, we're dedicated to making your property search
              effortless and enjoyable. Whether it's a cozy house, modern
              apartment, or expansive land, we're here to guide you. With a
              passion for real estate and a commitment to exceptional service,
              Housinn is your ultimate destination for all your property needs.
            </p>
          </div>
          <div className="flex gap-5 sm:gap-[60px]">
            <div>
              <h1 className="text-2xl sm:text-[64px] leading-[87px] font-semibold">
                100K+
              </h1>
              <p className="text-lg font-normal">Properties Listed</p>
            </div>
            <Image src={line} width={4} height={90} alt="line" />

            <div>
              <h1 className="text-2xl sm:text-[64px] leading-[87px] font-semibold">
                30K+
              </h1>
              <p className="text-lg font-normal">Properties Sold</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={property}
            width={400}
            height={400}
            alt="property-icon"
            className="sm:w-[400px] w-11 sm:h-[300px] lg:h-[400px] h-11"
          />
        </div>
      </div>
    </>
  );
};
export default AboutUs;
