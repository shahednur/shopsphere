import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

const ShoppingCart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

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
          <div className="row mb-3">
            <div className="col-xl-8">
              <div className="row align-items-center gy-3 mb-3">
                <div className="col-sm">
                  <h5 className="fs-14 mb-0">Your Cart ({cart.length} items)</h5>
                </div>
                <div className="col-sm-auto">
                  <Link to="/" className="link-primary text-decoration-underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {cart.map((item) => (
                <div className="card product mb-3" key={item._id}>
                  <div className="card-body">
                    <div className="row gy-3">
                      <div className="col-sm-auto">
                        <div className="avatar-lg bg-light rounded p-1">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="img-fluid d-block"
                          />
                        </div>
                      </div>
                      <div className="col-sm text-start">
                        <h5 className="fs-14 text-truncate">
                          <Link to={`/product/${item._id}`} className="text-body">
                            {item.name}
                          </Link>
                        </h5>
                        <ul className="list-inline text-muted">
                          <li className="list-inline-item">
                            Category: <span className="fw-medium">{item.category?.name || 'N/A'}</span>
                          </li>
                        </ul>
                        <div className="input-step">
                          <button
                            type="button"
                            className="minus material-shadow"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          >
                            –
                          </button>
                          <input
                            type="number"
                            className="product-quantity"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                            min="1"
                          />
                          <button
                            type="button"
                            className="plus material-shadow"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div className="text-lg-end">
                          <p className="text-muted mb-1">Item Price:</p>
                          <h5 className="fs-14">${item.price.toFixed(2)}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row align-items-center gy-3">
                      <div className="col-sm">
                        <div className="d-flex flex-wrap my-n1">
                          <button
                            className="d-block text-body p-1 px-2 btn btn-link"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>
                            Remove
                          </button>
                          <button className="d-block text-body p-1 px-2 btn btn-link">
                            <i className="ri-star-fill text-muted align-bottom me-1"></i>
                            Add to Wishlist
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex align-items-center gap-2 text-muted">
                          <div>Total:</div>
                          <h5 className="fs-14 mb-0">${(item.price * item.quantity).toFixed(2)}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-end mb-4">
                <Link to="/checkout" className="btn btn-success btn-label right ms-auto">
                  <i className="ri-arrow-right-line label-icon align-bottom fs-16 ms-2"></i>
                  Checkout
                </Link>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="sticky-side-div">
                <div className="card">
                  <div className="card-header border-bottom-dashed">
                    <h5 className="card-title mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body pt-2">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td>Sub Total:</td>
                            <td className="text-end">${calculateTotal()}</td>
                          </tr>
                          <tr className="table-active">
                            <th>Total (USD):</th>
                            <td className="text-end">
                              <span className="fw-semibold">${calculateTotal()}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="alert border-dashed alert-danger mt-4" role="alert">
                  <div className="d-flex align-items-center">
                    <div className="ms-2">
                      <h5 className="fs-14 text-danger fw-semibold">Buying for a loved one?</h5>
                      <p className="text-body mb-1">
                        Gift wrap and personalized message on card, <br />
                        Only for <span className="fw-semibold">$9.99</span> USD
                      </p>
                      <button className="btn ps-0 btn-sm btn-link text-danger">
                        Add Gift Wrap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
