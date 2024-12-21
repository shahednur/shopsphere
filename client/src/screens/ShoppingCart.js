import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext'; // Import CartContext

const ShoppingCart = () => {
  const { cart, addToCart, removeFromCart } = useCart(); // Access cart and functions

  const handleQuantityChange = (id, quantity) => {
    addToCart({ _id: id, quantity: Math.max(1, quantity) }); // Adjust quantity in cart
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  

  return (
    <div>
      <Navbar />
      <section className="shopping-cart">
        <div className="container">
          <h2 className="text-center">Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item._id} className="cart-item row">
                  <div className="col-md-2">
                    <img
                      src={item.images[0]} // Assuming 'images' is an array
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="col-md-4">
                    <h5 className="cart-item-name">{item.name}</h5>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="number"
                      className="form-control quantity-input"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                      min="1"
                    />
                  </div>
                  <div className="col-md-3 text-end">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-total text-end">
                <h5>Total: ${calculateTotal()}</h5>
              </div>
              <div className="text-center mt-4">
                <Link to="/checkout" className="btn btn-primary add-to-checkout-btn">
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
