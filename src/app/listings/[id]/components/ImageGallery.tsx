import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/ImageCarousel";
import { Card, CardContent } from "./ui/ImageCard";
import { ImageGalleryProps } from "@/types";


const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  currentImage,
  currentIndex,
}) => {
  console.log("cureent", currentIndex);
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <CardContent className="flex  items-center justify-center ">
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className=" object-fill rounded-xl h-[30vh] md:h-[40vh] w-full xl:w-[100vh]  xl:h-[70vh]  "
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-5 w-full  justify-center mt-6">
        {" "}
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default ImageGallery;
