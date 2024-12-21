import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderTracking = () => {
  const [orderStatus, setOrderStatus] = useState("Processing");

  // Simulate order status updates
  React.useEffect(() => {
    const statusUpdates = ["Shipped", "Out for Delivery", "Delivered"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statusUpdates.length) {
        setOrderStatus(statusUpdates[currentIndex]);
        currentIndex += 1;
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <section className="order-tracking">
        <div className="container text-center">
          <h2>Order Tracking</h2>
          <p>Your order status is being updated in real-time.</p>
          <div className="order-status">
            <h4>Current Status: <span className="status-text">{orderStatus}</span></h4>
          </div>
          <Link to="/" className="btn btn-primary mt-4">Return to Home</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OrderTracking;



