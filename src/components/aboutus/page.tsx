import React from "react";
import property from "../../../public/icons/property.png";
import Image from "next/image";
import {
  AppleDownloadButton,
  GoogleDownloadButton,
} from "../../../public/icons";

const AboutUs = () => {
  return (
    <>
      <div className="flex justify-center w-full bg-primary text-white/90 gap-[18px] py-10 md:py-5 px-11 lg:px-[104px]">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-5 ">
            <h3 className="text-[32px] font-semibold">About Us</h3>
            <p className="text-base lg:text-lg max-w-[620px] text-wrap">
              At Housinn, we're dedicated to making your property search
              effortless and enjoyable. Whether it's a cozy house, modern
              apartment, or expansive land, we're here to guide you. With a
              passion for real estate and a commitment to exceptional service,
              Housinn is your ultimate destination for all your property needs.
            </p>
          </div>
          <div className="flex justify-between md:justify-start gap-4">
            <Image
              src={GoogleDownloadButton}
              width={0}
              height={0}
              className="w-36 lg:w-40"
              alt="Download on Google Play"
            />
            <Image
              src={AppleDownloadButton}
              width={0}
              height={0}
              className="w-36 lg:w-40"
              alt="Download on the App Store"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={property}
            width={400}
            height={400}
            alt="property-icon"
            className="sm:w-[400px] hidden sm:block w-11 sm:h-[300px] lg:h-[400px] h-11"
          />
        </div>
      </div>
    </>
  );
};
export default AboutUs;
