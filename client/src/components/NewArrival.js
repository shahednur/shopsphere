import React from 'react';
import { FaBoxOpen, FaCartPlus } from 'react-icons/fa';

const NewArrival = () => {
  const arrivals = [
    {
      id: 1,
      name: "Gaming Laptop",
      description: "Powerful gaming laptop with high-end specs.",
      price: "$1299",
      icon: <FaBoxOpen className="arrival-icon" />,
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      description: "Portable speaker with crystal-clear sound quality.",
      price: "$99",
      icon: <FaBoxOpen className="arrival-icon" />,
    },
    {
      id: 3,
      name: "4K TV",
      description: "Experience movies in stunning 4K resolution.",
      price: "$799",
      icon: <FaBoxOpen className="arrival-icon" />,
    },
  ];

  return (
    <section className="new-arrival">
      <div className="container">
        <h2 className="text-center">New Arrivals</h2>
        <p className="text-center">
          Showcase the latest arrivals in inventory.
        </p>
        <div className="row justify-content-center">
          {arrivals.map((arrival) => (
            <div key={arrival.id} className="col-md-4 text-center">
              <div className="arrival-card">
                {arrival.icon}
                <h5>{arrival.name}</h5>
                <p>{arrival.description}</p>
                <p className="arrival-price">{arrival.price}</p>
                <button className="btn btn-success">
                  <FaCartPlus /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
