import Image from "next/image";
import React from "react";
import GoogleDownloadButton from "../../public/icons/google-bownload-button.svg";
import AppleDownloadButton from "../../public/icons/apple-download-button.svg";
const GetOurApp: React.FC = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div className="col-span-1">
        {" "}
        <h1>Get Our App</h1>
        <p>
          Download our Android app or iOS app to get quick access to property on
          Housinn from your mobile phone.
        </p>
        <div className="flex justify-center gap-[21px]">
          {" "}
          <Image
            src={GoogleDownloadButton}
            width={180}
            height={52}
            alt="Google-download-button"
          />
          <Image
            src={AppleDownloadButton}
            width={180}
            height={52}
            alt="Apple-download-button"
          />
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default GetOurApp;
