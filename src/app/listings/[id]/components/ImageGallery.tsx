import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/ImageCarousel";
interface ImageGalleryProps {
  images: string[]; // Array of image URLs
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
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
                    className=" object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-5 w-fit justify-between">
        {" "}
      <div className="pr-4">  <CarouselPrevious /></div>
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default ImageGallery;
