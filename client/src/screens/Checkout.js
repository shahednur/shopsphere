import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";

const Checkout = () => {
  const { cart } = useCart();
  const [currentStep, setCurrentStep] = useState("pills-bill-info");
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      zip: "",
    },
    // shippingInfo: {
    //   address: "",
    //   city: "",
    //   state: "",
    //   zip: "",
    //   country: "United States",
    // },
    paymentInfo: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const proceedToNextStep = (nextStep) => {
    setCurrentStep(nextStep);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <section className="checkout">
        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body checkout-tab">
                  <form>
                    {/* Step Navigation */}
                    <div className="step-arrow-nav mt-n3 mx-n3 mb-3">
                      <ul
                        className="nav nav-pills nav-justified custom-nav"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              currentStep === "pills-bill-info" ? "active" : ""
                            }`}
                            onClick={() => setCurrentStep("pills-bill-info")}
                          >
                            <i className="ri-user-2-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                            Personal Info
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              currentStep === "pills-payment" ? "active" : ""
                            }`}
                            onClick={() => setCurrentStep("pills-payment")}
                          >
                            <i className="ri-bank-card-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                            Payment Info
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              currentStep === "pills-finish" ? "active" : ""
                            }`}
                            onClick={() => setCurrentStep("pills-finish")}
                          >
                            <i className="ri-checkbox-circle-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                            Finish
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Step Content */}
                    <div className="tab-content">
                      {/* Personal Info */}
                      {currentStep === "pills-bill-info" && (
                        <div className="tab-pane fade active show" id="pills-bill-info" role="tabpanel" aria-labelledby="pills-bill-info-tab">
                          <h5 className="mb-1">Billing Information</h5>
                          <p className="text-muted mb-4">
                            Please fill all information below
                          </p>
                          <div className="row">
                            <div className="col-md-6 mb-3 text-start">
                              <label>First Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter first name"
                                value={formData.personalInfo.firstName}
                                onChange={(e) =>
                                  handleInputChange(
                                    "personalInfo",
                                    "firstName",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6 mb-3 text-start">
                              <label>Last Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter last name"
                                value={formData.personalInfo.lastName}
                                onChange={(e) =>
                                  handleInputChange(
                                    "personalInfo",
                                    "lastName",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6 mb-3 text-start">
                              <label>Email</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter email"
                                value={formData.personalInfo.email}
                                onChange={(e) =>
                                  handleInputChange(
                                    "personalInfo",
                                    "email",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6 mb-3 text-start">
                              <label>Phone</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter phone"
                                value={formData.personalInfo.phone}
                                onChange={(e) =>
                                  handleInputChange(
                                    "personalInfo",
                                    "phone",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-12 mb-3 text-start">
                              <label
                                for="billinginfo-address"
                                className="form-label"
                              >
                                Address
                              </label>
                              <textarea
                                className="form-control"
                                id="billinginfo-address"
                                placeholder="Enter address"
                                rows="3"
                                value={formData.personalInfo.address}
                                onChange={(e) =>
                                  handleInputChange(
                                    "personalInfo",
                                    "address",
                                    e.target.value
                                  )
                                }
                              ></textarea>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="mb-3 text-start">
                                  <label for="country" className="form-label">
                                    Country
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    placeholder="Enter Country"
                                    value={formData.personalInfo.country}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "personalInfo",
                                        "country",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3 text-start">
                                  <label for="state" className="form-label">
                                    State
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    placeholder="Enter state"
                                    value={formData.personalInfo.state}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "personalInfo",
                                        "state",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3 text-start">
                                  <label for="zip" className="form-label">
                                    Zip Code
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="zip"
                                    placeholder="Enter zip code"
                                    value={formData.personalInfo.zip}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "personalInfo",
                                        "zip",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary mt-3"
                            onClick={() =>
                              proceedToNextStep("pills-payment")
                            }
                          >
                            Proceed to Payment
                          </button>
                        </div>
                      )}

                      {/* Additional Steps... */}
                      {currentStep === "pills-payment" && (
                  <div>
                    <h5 className="mb-1">Payment Information</h5>
                    <div className="card p-4 border shadow-none mb-0 mt-4">
                      <div className="row gy-3">
                        <div className="col-md-12 text-start">
                          <label>Name on Card</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={formData.paymentInfo.cardName}
                            onChange={(e) =>
                              handleInputChange("paymentInfo", "cardName", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-6 text-start">
                          <label>Credit Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="xxxx xxxx xxxx xxxx"
                            value={formData.paymentInfo.cardNumber}
                            onChange={(e) =>
                              handleInputChange("paymentInfo", "cardNumber", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3 text-start">
                          <label>Expiration</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="MM/YY"
                            value={formData.paymentInfo.expiryDate}
                            onChange={(e) =>
                              handleInputChange("paymentInfo", "expiryDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3 text-start">
                          <label>CVV</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="xxx"
                            value={formData.paymentInfo.cvv}
                            onChange={(e) =>
                              handleInputChange("paymentInfo", "cvv", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={() => alert("Order Completed!")}
                    >
                      Complete Order
                    </button>
                  </div>
                )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-xl-4">
              <div className="card">
                <div className="card-header">
                  <h5>Order Summary</h5>
                </div>
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>
                            {item.quantity} x ${item.price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <th>Total</th>
                        <th>${calculateTotal()}</th>
                      </tr>
                    </tbody>
                  </table>
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

export default Checkout;
