"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "../../public/icons/next-arrow.svg";
import PreviousArrow from "../../public/icons/previous-arrow.svg";
import PersonCircle from "../../public/icons/person-circle.svg";

import CurvedArrowTop from "../../public/icons/curved-arrow-top.svg";
import CurvedArrowBottom from "../../public/icons/curved-arrow-bottom.svg";

import Image from "next/image";

interface Testimonial {
  image: string;
  name: string;
  location: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    image: PersonCircle,
    name: "Okpara Fred",
    location: "Wuse, Abuja",
    message:
      "I purchased through Housinn and found their level of service to be above and beyond and I would highly recommend them to any future purchasers if they require a great level of service.",
  },
  {
    image: PersonCircle,
    name: "Ajoke Ademola",
    location: "Owerri, Imo",
    message:
      "I was very impressed with this company. From the initial assignment by our agent it was a great experience.",
  },
  {
    image: PersonCircle,
    name: "Onu Samuel",
    location: "Lekki, Lagos",
    message:
      "Buying a house from Housinn was one of the best decisions I've ever made, their services were amazing and every transaction made were seamless and transparent.",
  },
];

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
      <Image
        src={PreviousArrow}
        width={52}
        height={52}
        alt="previous-arrow"
        onClick={onClick}
        className="cursor-pointer"
      />
    </div>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
      <Image
        src={NextArrow}
        width={52}
        height={52}
        alt="next-arrow"
        onClick={onClick}
        className="cursor-pointer"
      />
    </div>
  );
};

const Reviews: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <section className="relative flex flex-col gap-8 mx-[104px] pt-[71px] pb-[131px]">
      <Image
        src={CurvedArrowTop}
        alt="image"
        width={80}
        height={86}
        className="absolute top-[110px] -left-[60px] "
      />{" "}
      <Image
        src={CurvedArrowBottom}
        alt="image"
        width={80}
        height={86}
        className="absolute bottom-[40px] -right-[60px] "
      />
      <div className="flex flex-col gap-3 w-full text-center ">
        <h1 className="font-semibold text-4xl text-primary">Reviews</h1>
        <p className="font-semibold text-2xl text-gray-600">
          Here are what some of our customers are saying
        </p>
      </div>
      <div className="">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="h-[400px] w-[400px]  m-2  rounded-lg ">
              <div className="flex flex-col items-center  justify-start  px-[56px] pb-[42px] pt-[32px] w-full h-full text-center">
                <Image
                  src={testimonial.image}
                  alt="image"
                  width={100}
                  height={100}
                  className="mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {testimonial.location}
                </p>
                <p className=" text-gray-700 ">"{testimonial.message}"</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reviews;
