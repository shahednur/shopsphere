import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/api/${id}`
        );
        setProduct(response.data.data); // Assuming the API response contains product data in `data.data`
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container text-center">
          <h2>Loading Product Details...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container text-center">
          <h2>{error}</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container text-center">
          <h2>Product Not Found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div>
      <Navbar />
      <section className="product-details">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img
                src={product.images[0]} // Assuming 'images' is an array
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="col-md-8 product-details-content">
              <h2 className="product-name">{product.name}</h2>

              <div className="product-meta">
                <p>
                  <span className="meta-label">Category:</span>{" "}
                  <span className="meta-value">
                    {product.category?.name || "No Category"}
                  </span>
                </p>
                <p>
                  <span className="meta-label">Price:</span>{" "}
                  <span className="meta-value">
                    ${product.price.toFixed(2)}
                  </span>
                </p>
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-reviews">
                <h5>Customer Reviews</h5>
                {product.ratings && product.ratings.length > 0 ? (
                  <div className="reviews-list">
                    {product.ratings.map((rating, index) => (
                      <div key={index} className="review-item">
                        <div className="review-header">
                          <span className="review-user">
                            {rating.user || "Anonymous"}
                          </span>
                          <span className="review-rating">
                            {rating.rating}/5
                          </span>
                        </div>
                        <p className="review-comment">{rating.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-reviews">No reviews yet.</p>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-info add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails;
