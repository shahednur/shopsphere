import React from 'react';
import { FaTag, FaBolt } from 'react-icons/fa';

const TopDeals = () => {
  const deals = [
    {
      id: 1,
      name: "50% Off Smart TVs",
      description: "Limited-time offer on select Smart TVs.",
      originalPrice: "$999",
      discountedPrice: "$499",
      icon: <FaTag className="deal-icon" />,
    },
    {
      id: 2,
      name: "Buy 1 Get 1 Free",
      description: "On all fashion accessories.",
      originalPrice: "", // No original price for BOGO offers
      discountedPrice: "Special Offer",
      icon: <FaBolt className="deal-icon" />,
    },
    {
      id: 3,
      name: "30% Off Laptops",
      description: "Save big on premium laptops.",
      originalPrice: "$1299",
      discountedPrice: "$909",
      icon: <FaTag className="deal-icon" />,
    },
  ];

  return (
    <section className="top-deals">
      <div className="container">
        <h2 className="text-center">Top Deals & Offers</h2>
        <p className="text-center">
          Highlight discounts, flash sales, or limited-time offers.
        </p>
        <div className="row justify-content-center">
          {deals.map((deal) => (
            <div key={deal.id} className="col-md-4 text-center">
              <div className="deal-card">
                {deal.icon}
                <h5>{deal.name}</h5>
                <p>{deal.description}</p>
                {deal.originalPrice && (
                  <p className="original-price">Was: {deal.originalPrice}</p>
                )}
                <p className="discounted-price">Now: {deal.discountedPrice}</p>
                <button className="btn btn-danger">Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDeals;