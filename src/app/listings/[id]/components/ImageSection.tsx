import React from "react";
import Slider from "react-slick";

interface ImageSectionProps {
  images: string[];
  title: string;
  openGallery: (image?: string) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  images,
  title,
  openGallery,
}) => { const settings = {
  customPaging: function(i:number) {
    return (
      <a>
        <img src={images[i]} alt={`Thumbnail ${i + 1}`} />
      </a>
    );
  },
  dots: true,
  dotsClass: "slick-dots slick-thumb",
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
  if (images.length === 1) {
    return (
      <div className="h-full">
        <img
          src={images[0]}
          alt={title}
          className="object-fill w-full h-[60vh] rounded-[7px]"
          onClick={() => openGallery(images[0])}
        />
      </div>
    );
  } else if (images.length === 2) {
    return (
      <div>
        <div className="slider-container xl:hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} className="w-full h-[30vh] md:h-[40vh] object-cover" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>

        <div className=" hidden xl:grid xl:grid-cols-2 w-full   gap-2 ">
        <img
          src={images[0]}
          alt={title}
          className=" object-cover xl:object-fill w-full h-[30vh] xl:h-[50vh] rounded-[7px]"
          onClick={() => openGallery(images[0])}
        />{" "}
        <img
          src={images[1]}
          alt={title}
          className="object-cover xl:object-fill w-full h-[30vh] xl:h-[50vh] rounded-[7px] "
          onClick={() => openGallery(images[1])}
        />
      </div>
      </div>
    );
  } else if (images.length >= 3) {
    return (
      <div className="grid grid-col-1 md:grid-cols-2 gap-2 ">
        <div className="col-span-1 ">
          <img
            src={images[0]}
            alt={title}
            className="object-fill w-full h-[60vh] rounded-[7px]"
            onClick={() => openGallery(images[0])}
          />
        </div>
        <div className="flex md:flex-col gap-2 ">
          <img
            src={images[1]}
            alt={title}
            className="object-fill w-full h-[30vh] rounded-[7px]"
            onClick={() => openGallery(images[1])}
          />
          <div className="relative">
            <img
              src={images[2]}
              alt={title}
              className="object-fill w-full h-[30vh] rounded-[7px]"
              onClick={() => openGallery(images[2])}
            />
            {images.length > 3 && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white "
                onClick={() => openGallery()}
              >
                <span>View More</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ImageSection;
