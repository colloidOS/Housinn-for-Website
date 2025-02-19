import React from "react";
import SelectHouse from "../../../public/icons/select-house.svg";
import Rent from "../../../public/icons/rent-apartment.svg";
import Sell from "../../../public/icons/sell-property.svg";
import Shortlet from "../../../public/icons/shortlet.svg";
import Image from "next/image";
import Link from "next/link";

function Services() {
  return (
    <div className="flex flex-col bg-background gap-8 w-full pb-[34px] pt-[48px]">
      <div className="flex flex-col px-5 sm:px-0 gap-6 text-center justify-center items-center">
        <h3 className="text-primary text-[32px] font-semibold">Our Services</h3>
        <p className="text-base sm:text-lg text-gray text-center max-w-[700px]">
          At Housinn, our suite of services is designed to cater to every aspect
          of your real estate journey. Whether you're buying, renting, selling,
          or exploring short-letting options, we're here to make the entire
          process seamless, enjoyable, and tailored to your specific needs.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full px-11 lg:px-[104px] ">
        <div className="flex flex-col gap-4 justify-center  iems-center sm:mb-[54px]">
          <div className="shadow-custom-shadow bg-white py-10 px-[74px] flex flex-col items-center gap-6 max-w-[600px]">
            <h2 className="text-black text-center text-2xl font-bold">
              Buy a Property
            </h2>
            <Image
              src={SelectHouse}
              width={323}
              height={323}
              alt="select-house"
            />
            <p className="text-gray text-center text-sm sm:text-lg font-normal">
              Unlock the door to your dream home with Housinn's comprehensive
              buying services.
            </p>
            <Link href="/listings">
              <button className="bg-secondary/10 text-sm sm:text-base text-nowrap sm:text-wrap font-semibold py-[11px] px-6 rounded-md border text-secondary/90 w-fit border-secondary">
                Browse Properties
              </button>
            </Link>
          </div>
          <div className="shadow-custom-shadow bg-white py-10 px-[74px] flex flex-col items-center gap-6 max-w-[600px]">
            <h2 className="text-black text-center text-2xl font-bold">
              Rent a Property
            </h2>
            <Image src={Rent} width={323} height={323} alt="select-house" />
            <p className="text-gray text-center text-sm sm:text-lg font-normal">
              Find your ideal living space. Whether you're searching for an
              apartment, a house, or a commercial space, Housinn provides a
              diverse range of rental listings.
            </p>{" "}
            <Link href={`/listings?tag=rent`}>
              <button className="bg-secondary/10 text-sm sm:text-base text-nowrap sm:text-wrap font-semibold py-[11px] px-6 rounded-md border text-secondary/90 w-fit border-secondary">
                Find Rentals
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4  items-center sm:mt-[104px]">
          <div className="shadow-custom-shadow bg-white py-10 px-[74px] flex flex-col items-center gap-6 max-w-[600px]">
            <div className="flex flex-col gap-[81px]">
              <h2 className="text-black text-center text-2xl font-bold">
                Sell a Property
              </h2>
              <Image src={Sell} width={323} height={209} alt="select-house" />
            </div>
            <p className="text-gray text-center text-sm sm:text-lg font-normal">
              Maximize the value of your property by selling with us at Housinn.
            </p>
            <Link href={`/dashboard/add-new-listing`}>
              <button className="bg-secondary/10 text-sm sm:text-base text-nowrap sm:text-wrap font-semibold py-[11px] px-6 rounded-md border text-secondary/90 w-fit border-secondary">
                Sell Property
              </button>
            </Link>
          </div>
          <div className="shadow-custom-shadow bg-white py-10 px-[55px] flex flex-col items-center gap-6 max-w-[600px]">
            <h2 className="text-black text-center text-2xl font-bold">
              Stay in A Short-Let
            </h2>
            <Image src={Shortlet} width={323} height={323} alt="select-house" />
            <p className="text-gray text-center text-sm sm:text-lg font-normal">
              If you're a property owner seeking temporary tenants or a traveler
              in need of short-term accommodation, our platform caters to your
              unique needs
            </p>

            <Link href={`/listings?tag=shortlet`}>
              <button className="bg-secondary/10 text-sm sm:text-base text-nowrap sm:text-wrap font-semibold py-[11px] px-6 rounded-md border text-secondary/90 w-fit border-secondary">
                Find a Short-Let
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
