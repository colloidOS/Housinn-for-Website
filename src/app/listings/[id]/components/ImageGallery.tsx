import React from "react";

interface ImageGalleryProps {
  images: string[];
  title: string;
  openGallery: (image?: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  title,
  openGallery,
}) => {
  if (images.length === 1) {
    return (
      <div className="h-full">
        <img
          src={images[0]}
          alt={title}
          className="object-fill w-full h-full cursor-pointer"
          onClick={() => openGallery(images[0])}
        />
      </div>
    );
  } else if (images.length === 2) {
    return (
      <div className="grid md:grid-cols-2 w-full h-full gap-2 ">
        <img
          src={images[0]}
          alt={title}
          className="object-fill  object-center w-full h-fit cursor-pointer"
          onClick={() => openGallery(images[0])}
        />{" "}
        <img
          src={images[1]}
          alt={title}
          className="object-fill  object-center w-full h-fit cursor-pointer"
          onClick={() => openGallery(images[1])}
        />
      </div>
    );
  } else if (images.length >= 3) {
    return (
      <div className="grid grid-col-1 md:grid-cols-2 gap-2 ">
        <div className="col-span-1 ">
          <img
            src={images[0]}
            alt={title}
            className="object-fill cursor-pointer"
            onClick={() => openGallery(images[0])}
          />
        </div>
        <div className="flex md:flex-col gap-2 ">
          <img
            src={images[1]}
            alt={title}
            className="object-cover md:w-full cursor-pointer"
            onClick={() => openGallery(images[1])}
          />
          <div className="relative">
            <img
              src={images[2]}
              alt={title}
              className="object-cover md:w-full cursor-pointer"
              onClick={() => openGallery(images[2])}
            />
            {images.length > 3 && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer"
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

export default ImageGallery;
