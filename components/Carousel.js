import Image from "next/image";

const Carousel = ({ images }) => {
  return (
    <div className="carousel-inner">
      {images.map((image, index) => (
        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="d-block w-100"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
