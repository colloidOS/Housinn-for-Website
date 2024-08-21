import React from "react";
import Twitter from "../../public/icons/twiiter.svg";
import FeDiverse from "../../public/icons/fediverse.svg";
import ParkOutline from "../../public/icons/icon-park-outline-local.svg";
import Friendship from "../../public/icons/carbon-friendship.svg";
import CuteSafetyCertificate from "../../public/icons/ming-cutesafety-certificate-line.svg";
import CustomerService from "../../public/icons/carbon-customer-service.svg";
import NimbusMarketing from "../../public/icons/nimbus-marketing.svg";
import Image from "next/image";

const sections = [
  {
    title: "Diverse Property Inventory",
    description:
      "Housinn offers a wide variety of properties for our clients to choose from. If you're looking for a cozy home, a modern apartment, a spacious house, or a commercial space, we have the perfect property for you.",
    image: FeDiverse,
  },
  {
    title: "Local Expertise",
    description:
      "Learn about local real estate markets from our team. We provide valuable insights into neighborhood dynamics, market trends, and potential investment opportunities, ensuring that you make informed decisions.",
    image: ParkOutline,
  },
  {
    title: "User-Friendly Platform",
    description:
      "Housinn's user-friendly platform makes real estate easy. Our intuitive search features, easy-to-use interface, and streamlined processes empower users to find, shortlist, and connect with properties easily. Your property search has never been more accessible.",
    image: Friendship,
  },
  {
    title: "Trustworthy Services",
    description:
      "Housinn offers a wide variety of properties for our clients to choose from. If you're looking for a cozy home, a modern apartment, a spacious house, or a commercial space, we have the perfect property for you.",
    image: CuteSafetyCertificate,
  },
  {
    title: "Exceptional Customer Service",
    description:
      "Our team of real estate professionals offers personalized and attentive service to all, from first-time buyers to seasoned investors, ensuring your satisfaction throughout the process and addressing any concerns you may have.",
    image: CustomerService,
  },
  {
    title: "User-Friendly Platform",
    description:
      "Housinn's user-friendly platform makes real estate easy. Our intuitive search features, easy-to-use interface, and streamlined processes empower users to find, shortlist, and connect with properties easily. Your property search has never been more accessible.",
    image: NimbusMarketing,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="flex flex-col gap-[32px] pt-[48px] pb-[170px] px-[104px]">
      <div className="flex flex-col gap-3 w-full text-center ">
        <h1 className="font-semibold text-4xl text-secondary">
          Why Choose Us?
        </h1>
        <p className="font-semibold text-2xl text-primary">
          Get the best real estate services here at Housinn
        </p>
      </div>
      <div className="grid grid-cols-2 gap-[31px]">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-[32px]">
            <div className="flex gap-4 items-start">
              <Image
                src={section.image}
                width={40}
                height={40}
                alt={section.title}
              />
              <div>
                <h2 className="font-semibold text-[18px]">{section.title}</h2>
                <p>{section.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
