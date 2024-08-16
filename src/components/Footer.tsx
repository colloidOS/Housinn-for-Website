// components/Footer.tsx
import React from "react";
import GoogleDownloadButton from "../../public/icons/google-bownload-button.svg";
import AppleDownloadButton from '../../public/icons/apple-download-button.svg'
import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 flex p-2 text-white ">
      <div className=" grid grid-cols-3">
        <div className="mx-10">
          <h1 className="font-semibold text-2xl">About</h1>
          <p className="font-normal text-base">
            Welcome to Housinn, your trusted partner in the world of real
            estate. We are more than just a real estate company; we are your
            gateway to finding the perfect home, the ideal investment property,
            or the most suitable buyer or tenant.
          </p>
        </div>{" "}
        <div className="mx-10">
          <h1 className="font-semibold text-2xl">Contact Us</h1>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="mx-10">
          <h1 className="font-semibold text-2xl">Download Our Mobile App</h1>
          <div className="flex justify-between">
            {" "}
            <Image
              src={GoogleDownloadButton}
              width={120}
              height={120}
              alt="Google-download-button"
            />
               <Image
              src={AppleDownloadButton}
              width={120}
              height={120}
              alt="Apple-download-button"
            />
          </div>
        </div>
      </div>
      <div></div>
    </footer>
  );
};

export default Footer;
