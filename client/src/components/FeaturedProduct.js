import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const FeaturedProduct = () => {
  const products = [
    {
      id: 1,
      name: "Smartphone X",
      description: "Top-rated smartphone with excellent performance.",
      price: "$799",
      icon: <FaStar className="product-icon" />,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "Best-selling headphones with noise cancellation.",
      price: "$199",
      icon: <FaStar className="product-icon" />,
    },
    {
      id: 3,
      name: "Smartwatch Z",
      description: "Seasonal favorite with advanced health tracking.",
      price: "$249",
      icon: <FaStar className="product-icon" />,
    },
  ];

  return (
    <section className="featured-product">
      <div className="container">
        <h2 className="text-center">Featured Products</h2>
        <p className="text-center">
          Display top-rated, best-selling, or seasonal products.
        </p>
        <div className="row justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 text-center">
              <div className="product-card">
                {product.icon}
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p className="product-price">{product.price}</p>
                <button className="btn btn-primary">
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;

