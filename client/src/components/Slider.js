import React from 'react';
import promotionImage from '../images/promotion.jpg';
import newArrivalsImage from '../images/new-arrival.jpg';
import featuredProductImage from '../images/featured.jpg';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: "Big Promotion!",
      description: "Up to 50% off on selected items!",
      image: promotionImage,
      buttonText: "Shop Now",
      link: "/promotions",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Discover the latest trends in fashion.",
      image: newArrivalsImage,
      buttonText: "Explore",
      link: "/new-arrivals",
    },
    {
      id: 3,
      title: "Featured Product",
      description: "Top-rated product just for you.",
      image: featuredProductImage,
      buttonText: "Buy Now",
      link: "/featured-product",
    },
  ];

  return (
    <div id="shopeShereCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            data-bs-target="#shopeShereCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img src={slide.image} className="d-block w-100 carousel-image" alt={slide.title} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{slide.title}</h5>
              <p>{slide.description}</p>
              <a href={slide.link} className="btn btn-primary">
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#shopeShereCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#shopeShereCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
