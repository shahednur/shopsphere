import React from "react";

import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import FeaturedProduct from "../components/FeaturedProduct";
import NewArrival from "../components/NewArrival";
import TopDeals from "../components/TopDeals";
import Testimonials from "../components/Testimonials";
import BrandsAndPartners from "../components/BrandsAndPartners";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <FeaturedProduct />
      <NewArrival />
      <TopDeals />
      <Testimonials />
      <BrandsAndPartners />
      <Footer />
    </div>
  );
}
