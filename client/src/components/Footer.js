import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/faqs">FAQs</a></li>
              <li><a href="/returns">Returns</a></li>
              <li><a href="/categories">Categories</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Newsletter Signup</h5>
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <button className="btn btn-primary w-100">Subscribe</button>
            </form>
          </div>
          <div className="col-md-3">
            <h5>Payment Options</h5>
            <div className="payment-icons d-flex justify-content-center">
              <FaCcVisa className="payment-icon" />
              <FaCcMastercard className="payment-icon" />
              <FaCcPaypal className="payment-icon" />
            </div>
          </div>
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <div className="social-icons d-flex justify-content-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="social-icon" />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col text-center">
            <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


