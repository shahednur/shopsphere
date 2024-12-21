import React from 'react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Carousel } from "react-bootstrap";
import AliceJohnson from '../images/alice-johnson.jpg';
import DavidSmith from '../images/david-smith.jpg';
import EmilyDavis from '../images/emily-davis.jpg';

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    designation: "Marketing Manager",
    avatar: AliceJohnson,
    rating: 4.5,
    review: "This platform exceeded my expectations! The service was impeccable, and the products are top-notch. Highly recommended!",
  },
  {
    id: 2,
    name: "David Smith",
    designation: "Software Engineer",
    avatar: DavidSmith,
    rating: 5,
    review: "An excellent shopping experience. Quick delivery, great quality, and fantastic customer support. Will shop again!",
  },
  {
    id: 3,
    name: "Emily Davis",
    designation: "Graphic Designer",
    avatar: EmilyDavis,
    rating: 4,
    review: "Great deals and easy-to-use platform. I found exactly what I needed with no hassle. A solid 4-star experience!",
  },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div className="stars">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="star" />
      ))}
      {halfStar && <FaStarHalfAlt className="star" />}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="customer-testimonials">
      <div className="container">
        <h2 className="text-center">Customer Testimonials</h2>
        <p className="text-center">Display reviews or feedback from happy customers.</p>
        <Carousel className="testimonial-carousel">
          {testimonials.map((testimonial) => (
            <Carousel.Item key={testimonial.id}>
              <div className="testimonial-card text-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="testimonial-avatar rounded-circle"
                />
                <h5 className="testimonial-name">{testimonial.name}</h5>
                <p className="testimonial-designation">{testimonial.designation}</p>
                {renderStars(testimonial.rating)}
                <p className="testimonial-review">"{testimonial.review}"</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;


