import React from 'react';
import { FaMobileAlt, FaTshirt, FaCouch } from 'react-icons/fa';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Find the latest gadgets and devices.",
      icon: <FaMobileAlt className="category-icon" />,
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy apparel and accessories.",
      icon: <FaTshirt className="category-icon" />,
    },
    {
      id: 3,
      name: "Home & Living",
      description: "Everything you need for your home.",
      icon: <FaCouch className="category-icon" />,
    },
  ];

  return (
    <section className="categories-overview">
      <div className="container">
        <h2 className="text-center">Categories Overview</h2>
        <p className="text-center">
          Highlight product categories with icons or images.
        </p>
        <div className="row justify-content-center">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 text-center">
              <div className="category-card">
                {category.icon}
                <h5>{category.name}</h5>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

