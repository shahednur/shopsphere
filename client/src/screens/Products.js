import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [sortOption, setSortOption] = useState("default");
  const [filterOption, setFilterOption] = useState("all");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/api");
        setProducts(response.data.data); // Assuming API response structure
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (products) => {
    if (sortOption === "priceLowToHigh") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  const handleFilter = (products) => {
    if (filterOption === "all") return products;
    return products.filter((product) => product.category === filterOption);
  };

  const filteredAndSortedProducts = handleSort(handleFilter(products));

  return (
    <div>
      <Navbar />
      <section className="product-listing">
        <div className="container">
          <h2 className="text-center">Product Listing</h2>

          {/* Loading and Error Messages */}
          {loading && <p>Loading products...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && (
            <>
              {/* Filter and Sort */}
              <div className="filter-sort">
                <div className="filter">
                  <label htmlFor="filter">Filter by Category:</label>
                  <select
                    id="filter"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Living</option>
                  </select>
                </div>
                <div className="sort">
                  <label htmlFor="sort">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Product List */}
              <div className="row">
                {filteredAndSortedProducts.map((product) => (
                  <div key={product._id} className="col-md-4">
                    <div className="product-card mt-4">
                      <div className="product-card-image">
                        <img
                          src={product.images[0]} // Assuming 'images' is an array
                          alt={product.name}
                        />
                      </div>
                      <div className="product-card-details">
                        <h5 className="product-card-name">{product.name}</h5>
                        <p className="product-card-category">
                          {product.category?.name || "No Category"}
                        </p>
                        <p className="product-card-price">
                          ${product.price.toFixed(2)}
                        </p>
                        <Link
                          to={`/product/${product._id}`}
                          className="product-card-button"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
