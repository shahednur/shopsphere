import React from 'react';
import { Carousel } from "react-bootstrap";
import cocacola from '../images/cocacola.png';
import prada from '../images/prada.png';
import versace from '../images/versace.jpg';
import pepsi from '../images/pepsi.jpg';
import rolex from '../images/rolex.png';
import mastercard from '../images/martercard.png';

const brands = [
  {
    id: 1,
    name: "Cocacola",
    logo: cocacola,
  },
  {
    id: 2,
    name: "Prada",
    logo: prada,
  },
  {
    id: 3,
    name: "Versace",
    logo: versace,
  },
  {
    id: 4,
    name: "Pepsi",
    logo: pepsi,
  },
  {
    id: 5,
    name: "Rolex",
    logo: versace,
  },
  {
    id: 6,
    name: "Mastercard",
    logo: mastercard,
  },
];

const BrandsAndPartners = () => {
  return (
    <section className="brands-partners">
      <div className="container">
        <h2 className="text-center">Brands and Partners</h2>
        <p className="text-center">List partner brands or suppliers to build trust.</p>
        <Carousel className="brands-carousel" indicators={false} controls={true} interval={2000}>
          <Carousel.Item>
            <div className="d-flex justify-content-around align-items-center">
              {brands.slice(0, 6).map((brand) => (
                <img
                  key={brand.id}
                  src={brand.logo}
                  alt={brand.name}
                  className="brand-logo"
                />
              ))}
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-around align-items-center">
              {brands.slice(0, 6).map((brand) => (
                <img
                  key={brand.id}
                  src={brand.logo}
                  alt={brand.name}
                  className="brand-logo"
                />
              ))}
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
};

export default BrandsAndPartners;



