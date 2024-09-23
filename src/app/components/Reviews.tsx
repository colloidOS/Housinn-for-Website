import React from "react";
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
import { CurvedArrowTop, CurvedArrowBottom } from "../../../public/icons";
import { reviews } from "@/data/review";

const Reviews: React.FC = () => {
  return (
    <Wrapper className="flex flex-col sm:gap-24 md:gap-8 relative">
      <Image
        src={CurvedArrowTop}
        alt="image"
        width={60}
        height={66}
        className="absolute hidden md:flex md:top-14 md:left-10 "
      />{" "}
      <Image
        src={CurvedArrowBottom}
        alt="image"
        width={60}
        height={66}
        className="absolute hidden md:flex md:-bottom-8 md:right-10 "
      />
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
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-3 h-full">
                <Card className="h-full">
                  <CardContent className="shadow-review flex flex-col gap-8 md:gap-4 h-full  items-center  text-center p-6">
                    <div className="flex flex-col gap-3 justify-center items-center">
                      <Image
                        src={review.image}
                        alt={review.name}
                        className="rounded-full "
                        width={100}
                        height={100}
                      />

                      <div>
                        <h3 className="font-bold text-[1.125rem]">
                          {review.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {review.location}.
                        </p>
                      </div>
                    </div>
                    <p className="text-[1.125rem] text-primary-main">
                      "{review.message}"
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
