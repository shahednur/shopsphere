import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./screens/Home";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import ShoppingCart from "./screens/ShoppingCart";
import Checkout from "./screens/Checkout";
import OrderTracking from "./screens/OrderTracking";
import Register from "./screens/Register";
import Login from "./screens/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
