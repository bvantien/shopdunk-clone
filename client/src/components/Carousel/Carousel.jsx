import React, { useEffect, useState } from "react";
import "./Carousel.css";

const Carousel = ({ customClass }) => {
  const images = [
    "https://shopdunk.com/images/uploaded/banner/banner%202024/Thang%20_%2010/02_10/banner%20iphone%2016%20pro-%C4%90C_PC.png",
    "https://shopdunk.com/images/uploaded/banner/banner%202024/Thang%20_%2010/banner%20iPsr-T10_PC.png",
    "https://shopdunk.com/images/uploaded/banner/banner%202024/Thang%20_%2010/banner%20Mcsr-T10_PC.png",
    "https://shopdunk.com/images/uploaded/banner/banner%202024/Thang%20_%2010/banner%20Wsr-T10_PC.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`carousel ${customClass}`}>
      <button className="carousel-button prev-button" onClick={prevSlide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </button>

      <div
        className="carousel-slide"
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </div>

      <button className="carousel-button next-button" onClick={nextSlide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      </button>

      <div className="indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
