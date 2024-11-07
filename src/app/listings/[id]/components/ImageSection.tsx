import React, { useEffect, useState } from "react";
import Slider from "react-slick";

interface ImageSectionProps {
  images: string[];
  title: string;
  openGallery: (image?: string, index?: number) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  images,
  title,
  openGallery,
}) => {
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(2); // Laptop and above
      } else {
        setSlidesToShow(1); // Mobile and tablet
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={images[i]} alt={`Thumbnail ${i + 1}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: images.length > 1,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="slider-container ">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="">
              <img
                src={image}
                className="w-full p-1 rounded-[14px] h-[40vh] md:h-[45vh] lg:h-[50vh] object-cover"
                alt={`Slide ${index + 1}`}
                onClick={() => openGallery(image, index)} // Pass image and index
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSection;
