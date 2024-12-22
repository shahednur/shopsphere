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
  const [currentTab, setCurrentTab] = useState('personalInfo');
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
    cvv: '',
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

  const renderTabContent = () => {
    switch (currentTab) {
      case 'personalInfo':
        return (
          <div>
            <h5 className="mb-1">Personal Information</h5>
            <p className="text-muted mb-4">Please fill all the information below</p>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    value={shippingDetails.name}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Enter your phone"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() => setCurrentTab('shippingInfo')}
              >
                Proceed to Shipping
              </button>
            </div>
          </div>
        );
      case 'shippingInfo':
        return (
          <div>
            <h5 className="mb-1">Shipping Information</h5>
            <p className="text-muted mb-4">Please fill all the information below</p>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                rows="3"
                placeholder="Enter your address"
                value={shippingDetails.address}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="Enter city"
                    value={shippingDetails.city}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    placeholder="Enter country"
                    value={shippingDetails.country}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="postalCode"
                    placeholder="Enter postal code"
                    value={shippingDetails.postalCode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-light"
                onClick={() => setCurrentTab('personalInfo')}
              >
                Back to Personal Info
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentTab('paymentInfo')}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        );
      case 'paymentInfo':
        return (
          <div>
            <h5 className="mb-1">Payment Information</h5>
            <p className="text-muted mb-4">Enter your payment details below</p>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Name on Card</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameOnCard"
                    placeholder="Enter name on card"
                    value={billingDetails.nameOnCard}
                    onChange={handleBillingChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={billingDetails.cardNumber}
                    onChange={handleBillingChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={billingDetails.expiryDate}
                    onChange={handleBillingChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cvv"
                    placeholder="123"
                    value={billingDetails.cvv}
                    onChange={handleBillingChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-light"
                onClick={() => setCurrentTab('shippingInfo')}
              >
                Back to Shipping
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCheckout}
              >
                Complete Order
              </button>
            </div>
          </div>
        );
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <section className="checkout">
        <div className="container">
          <div className="card">
            <div className="card-body">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;
