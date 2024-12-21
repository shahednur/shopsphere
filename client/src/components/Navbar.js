import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container">
        <a className="navbar-brand custom-brand" href="#">
          ShopeSphere
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link custom-link" exact to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/products">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary custom-button" href="#">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
