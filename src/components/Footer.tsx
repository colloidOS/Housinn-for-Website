// components/Footer.tsx
import React from "react";
import GoogleDownloadButton from "../../public/icons/google-bownload-button.svg";
import AppleDownloadButton from "../../public/icons/apple-download-button.svg";
import Twitter from "../../public/icons/twiiter.svg";
import Facebook from "../../public/icons/facebook.svg";
import Linkedin from "../../public/icons/linkedin.svg";
import Instagram from "../../public/icons/instagram.svg";
import Address from "../../public/icons/address.svg";
import Telephone from "../../public/icons/telephone.svg";
import Mail from "../../public/icons/mail.svg";
import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 px-[104px] pb-[73px] pt-[31px] gap-[97px] flex flex-col p-2 text-white ">
      <div className=" grid gap-[131px] grid-cols-3">
        <div className=" gap-[11px]">
          <h1 className="font-semibold text-[24px]">About</h1>
          <p className="font-normal text-[16px]">
            Welcome to Housinn, your trusted partner in the world of real
            estate. We are more than just a real estate company; we are your
            gateway to finding the perfect home, the ideal investment property,
            or the most suitable buyer or tenant.
          </p>
        </div>{" "}
        <div className="flex flex-col gap-[21px]">
          <h1 className="font-semibold text-2xl">Contact Us</h1>

          <div className="flex items-center gap-3">
            {" "}
            <Image src={Address} width={21} height={21} alt="Address" />
            <p>7, University road, Nsukka, Enugu Nigeria. zip 900101</p>
          </div>
          <div className="flex items-center gap-3">
            {" "}
            <Image src={Telephone} width={21} height={21} alt="Telephone" />
            <p>+234-90 1234 5678</p>
          </div>
          <div className="flex items-center gap-3">
            {" "}
            <Image src={Mail} width={21} height={21} alt="Mail" />
            <p>info@housinn.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-[21px]">
          <h1 className="font-semibold text-2xl">Download Our Mobile App</h1>
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
      </div>
      <div className="flex w-full items-center justify-center gap-[34px]">
        {" "}
        <Image src={Twitter} width={21} height={21} alt="Twitter" />{" "}
        <Image src={Facebook} width={10.5} height={20} alt="Facebook" />{" "}
        <Image src={Linkedin} width={18} height={18} alt="Linkedin" />{" "}
        <Image src={Instagram} width={20} height={20} alt="Instagram" />
      </div>
    </footer>
  );
};

export default Footer;
