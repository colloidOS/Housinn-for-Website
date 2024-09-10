import Image from "next/image";
import React from "react";
import GoogleDownloadButton from "../../public/icons/google-bownload-button.svg";
import AppleDownloadButton from "../../public/icons/apple-download-button.svg";
import LeftPhone from "../../public/images/left-phone.png";
import RightPhone from "../../public/images/right-phone.png";
import Ellipse1 from "../../public/icons/ellipse-1.svg";
import Ellipse2 from "../../public/icons/ellipse-2.svg";
import Ellipse3 from "../../public/icons/ellipse-3.svg";

const GetOurApp: React.FC = () => {
  return (
    <div className=" grid md:grid-cols-2 grid-cols-1 justify-between  md:h-[385px] h-[80vh] get-our-app lg:mx-[104px] mx-6 sm:mx-8 rounded-[36px] text-white mb-[286px] mt-16">
      <div className="text-center md:text-left flex flex-col gap-5 md:pl-12 pt-14 pb-16">
        {" "}
        <h1 className="font-bold text-4xl">Get Our App</h1>
        <p className="font-normal text-[18px] leading-6">
          Download our Android app or iOS app to get quick access to property on
          Housinn from your mobile phone.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          {" "}
          <Image
            src={GoogleDownloadButton}
            width={140}
            height={52}
            alt="Google-download-button"
          />
          <Image
            src={AppleDownloadButton}
            width={140}
            height={52}
            alt="Apple-download-button"
          />
        </div>
      </div>
      <div className="text-center md:text-left w-full h-full relative">
        <div className="overflow-hidden relative w-full h-full ">
          <Image
            src={Ellipse1}
            width={560}
            height={560}
            alt="right-phone"
            className="absolute top-10 left-10"
          />{" "}
          <Image
            src={Ellipse2}
            width={452}
            height={452}
            alt="right-phone"
            className="absolute top-24 left-24"
          />{" "}
          <Image
            src={Ellipse3}
            width={375}
            height={375}
            alt="right-phone"
            className="absolute top-36 left-36"
          />
        </div>{" "}
        <div className="absolute bottom-0 w-full">
          <div className=" flex justify-around w-full ">
            <Image src={LeftPhone} width={218} height={433} alt="left-phone" />{" "}
            <Image
              src={RightPhone}
              width={218}
              height={433}
              alt="right-phone"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetOurApp;
