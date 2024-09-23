"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "../../../public/icons/next-arrow.svg";
import PreviousArrow from "../../../public/icons/previous-arrow.svg";
import PersonCircle from "../../../public/icons/person-circle.svg";

import CurvedArrowTop from "../../../public/icons/curved-arrow-top.svg";
import CurvedArrowBottom from "../../../public/icons/curved-arrow-bottom.svg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Wrapper from "@/components/ui/Wrapper";

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
  {
    image: PersonCircle,
    name: "Adeola Adebayo",
    location: "Abeokuta, Ogun",
    message:
      "Housinn helped me secure my dream home with ease. The process was smooth and the customer service was top-notch!",
  },
  {
    image: PersonCircle,
    name: "Bala Ibrahim",
    location: "Kaduna, Kaduna",
    message:
      "The professionalism and support from Housinn were beyond my expectations. Highly recommend them for anyone looking for a hassle-free real estate experience.",
  },
  {
    image: PersonCircle,
    name: "Nkechi Chukwuma",
    location: "Enugu, Enugu",
    message:
      "From start to finish, Housinn made the home-buying process stress-free. I couldn't be happier with their service and expertise.",
  },
];

const Reviews: React.FC = () => {
  return (
    <Wrapper className="flex flex-col gap-12 md:gap-8">
      <div className="flex flex-col gap-3 w-full text-center ">
        <h1 className="font-semibold text-4xl text-primary">Reviews</h1>
        <p className="font-semibold text-2xl text-gray-600">
          Here are what some of our customers are saying
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-3 h-full">
                <Card className="h-full">
                  <CardContent className="shadow-custom-shadow-review flex flex-col gap-8 md:gap-4 h-full  items-center  text-center p-6">
                    <div className="flex flex-col gap-3 justify-center items-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-full "
                        width={100}
                        height={100}
                      />

                      <div>
                        <h3 className="font-bold text-[1.125rem]">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}.
                        </p>
                      </div>
                    </div>
                    <p className="text-[1.125rem] text-primary-main">
                      "{testimonial.message}"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-full flex gap-12 mt-6 justify-center">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Wrapper>
  );
};

export default Reviews;
