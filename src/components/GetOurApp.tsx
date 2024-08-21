import Image from "next/image";
import React from "react";
import GoogleDownloadButton from "../../public/icons/google-bownload-button.svg";
import AppleDownloadButton from "../../public/icons/apple-download-button.svg";
import LeftPhone from "../../public/icons/left-phone.svg";
import RightPhone from "../../public/icons/right-phone.svg";
const GetOurApp: React.FC = () => {
  return (
    <div className="grid grid-cols-2 get-our-app mx-[104px] rounded-[36px] text-white pl-[89px] pt-[76px] pb-[63px] mb-[286px] mt-[68px]">
      <div className="col-span-1 flex flex-col gap-5">
        {" "}
        <h1 className="font-bold text-4xl">Get Our App</h1>
        <p className="font-normal text-[18px] leading-6">
          Download our Android app or iOS app to get quick access to property on
          Housinn from your mobile phone.
        </p>
        <div className="flex justify-between gap-[21px]">
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
      <div className="col-span-1">
        {" "}
        <Image
          src={LeftPhone}
          width={140}
          height={52}
          alt="left-phone"
        />{" "}
        <Image
          src={RightPhone}
          width={140}
          height={52}
          alt="right-phone"
        />
      </div>
    </div>
  );
};

export default GetOurApp;
