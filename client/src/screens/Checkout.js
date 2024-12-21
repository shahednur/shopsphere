import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext'; // Access cart context
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [billingDetails, setBillingDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    nameOnCard: '',
  });

  const handleShippingChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleBillingChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem('token');
      const decodedToken = token ? jwtDecode(token) : null;
      const userId = decodedToken ? decodedToken.id : null;
  
      if (!userId) {
        alert('User is not authenticated. Please log in.');
        navigate('/login'); // Redirect to login if user is not authenticated
        return;
      }
      const totalAmount = calculateTotal();
      const orderData = {
        user: userId, // Replace with actual user ID from authentication
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          street: shippingDetails.address,
          city: shippingDetails.city,
          postalCode: shippingDetails.postalCode,
          country: shippingDetails.country,
        },
        paymentDetails: {
          cardNumber: billingDetails.cardNumber,
          expiryDate: billingDetails.expiryDate,
          nameOnCard: billingDetails.nameOnCard,
        },
        totalAmount,
      };

      const response = await axios.post('http://localhost:5000/orders/create', orderData, { headers: { Authorization: token } });

      if (response.data.success) {
        alert('Order placed successfully!');
        navigate('/order-tracking'); // Navigate to order tracking page
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <section className="checkout">
        <div className="container">
          <h2 className="text-center">Checkout</h2>
          <form onSubmit={handleCheckout} className="checkout-form">
            <div className="row">
              <div className="col-md-6">
                <h5>Shipping Details</h5>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={shippingDetails.name}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={shippingDetails.address}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={shippingDetails.city}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="form-control"
                    value={shippingDetails.postalCode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={shippingDetails.country}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h5>Billing Details</h5>
                <div className="mb-3">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="form-control"
                    value={billingDetails.cardNumber}
                    onChange={handleBillingChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    className="form-control"
                    value={billingDetails.expiryDate}
                    onChange={handleBillingChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Name on Card</label>
                  <input
                    type="text"
                    name="nameOnCard"
                    className="form-control"
                    value={billingDetails.nameOnCard}
                    onChange={handleBillingChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Complete Checkout
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;
