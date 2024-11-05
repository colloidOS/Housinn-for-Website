import React from "react";
import Image from "next/image";
import { contactDetails, downloadLinks, socialLinks } from "@/data/footer";
import Wrapper from "./ui/Wrapper";

const Footer: React.FC = () => {
  return (
    <footer>
      <Wrapper className="bg-gray-100 gap-16 md:gap-12 flex flex-col text-white mt-24">
        <div className="gap-12 md:gap-7 flex flex-col justify-between md:flex-row">
          <div className="flex flex-col flex-1 gap-3">
            <h1 className="font-semibold text-2xl">About</h1>
            <p className="font-normal text-base">
              Housin is a tech-driven marketplace designed to simplify property
              transactions in Nigeria. We aim to provide a stress-free platform
              where users can explore properties for sale, rent, or shortlet
              across the country. Our vision is to revolutionize the Nigerian
              real estate market by reducing agency fees and enhancing
              accessibility. We plan to achieve this by employing district-based
              agents, collaborating with real estate companies, and managing
              properties for owners.
            </p>
          </div>
          <div className="flex flex-col gap-5 flex-1 ">
            <h1 className="font-semibold text-2xl">Contact Us</h1>
            {contactDetails.map((item, index) => (
              <a href={item.href || "#"} target="_blank" key={index} rel="noopener noreferrer">
                <div className="flex items-center gap-3">
                  <Image src={item.src} width={21} height={21} alt={item.alt} />
                  <p>{item.text}</p>
                </div>
              </a>
            ))}
          </div>
          {/* <div className="flex flex-col gap-5 flex-1 items-start">
            <h1 className="font-semibold text-2xl">Download Our Mobile App</h1>
            <div className="flex  w-full gap-5">
              {downloadLinks.map((link, index) => (
                <div className="flex items-center justify-center " key={index}>
                  <Image
                    src={link.src}
                    width={140}
                    height={52}
                    alt={link.alt}
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
        <ul className="flex w-full items-center justify-center gap-8">
          {socialLinks.map((link, index) => (
            <a href={link.href} target="_blank" key={index}>
              <Image
                src={link.src}
                // width={index === 1 ? 14 : 21}
                // height={index === 1 ? 14 : 21}
                width={21}
                height={21}
                alt={link.alt}
              />
            </a>
          ))}
        </ul>
      </Wrapper>
    </footer>
  );
};

export default Footer;
