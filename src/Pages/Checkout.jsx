import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date with slash
    if (name === "cardExpiry") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCost = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const isFormValid = () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.postalCode.trim()
    )
      return false;

    if (formData.paymentMethod === "card") {
      if (
        !formData.cardNumber.trim() ||
        !formData.cardName.trim() ||
        !formData.cardExpiry.trim() ||
        !formData.cardCVC.trim()
      )
        return false;
        
      // Validate card number length (16 digits without spaces)
      if (formData.cardNumber.replace(/\s/g, "").length !== 16) return false;
      
      // Validate CVC length
      if (formData.cardCVC.length < 3 || formData.cardCVC.length > 4) return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setSuccess("");
    setError("");

    if (!isFormValid()) {
      alert("Please fill all required fields correctly");
      setIsProcessing(false);
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        paymentMethod: formData.paymentMethod,
        cardDetails:
          formData.paymentMethod === "card"
            ? {
                cardNumber: formData.cardNumber,
                cardName: formData.cardName,
                cardExpiry: formData.cardExpiry,
                cardCVC: formData.cardCVC,
              }
            : null,
        items: cartItems,
        subtotal: totalPrice,
        shipping: shippingCost,
        tax: tax,
        total: finalTotal,
        timestamp: serverTimestamp(),
        status: "pending"
      });

      setSuccess("Order placed successfully!");
      setShowSuccessPopup(true);
      clearCart();
      
      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        navigate("/thankyou");
      }, 2000);
    } catch (err) {
      console.error("Firestore Error:", err);
      setError("Failed to place order. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !showSuccessPopup) {
    return (
      <main className="empty-checkout">
        <div className="empty-content">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some amazing products to your cart before checking out.</p>
          <Link to="/shop" className="shop-link">
            Continue Shopping
          </Link>
        </div>
        <style>{emptyCheckoutStyles}</style>
      </main>
    );
  }

  return (
    <main className="checkout-main">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="popup-icon">✅</div>
            <h3>Order Confirmed!</h3>
            <p>Your order has been successfully placed.</p>
            <p>Redirecting to thank you page...</p>
          </div>
        </div>
      )}

      {/* Header with Progress Bar */}
      <div className="checkout-header">
        <div className="container">
          <h1 className="checkout-title">
            <span className="title-icon">💳</span>
            Secure Checkout
          </h1>
          <div className="progress-bar">
            <div className="progress-step active">
              <div className="step-number">1</div>
              <span>Cart</span>
            </div>
            <div className="progress-line active"></div>
            <div className="progress-step active">
              <div className="step-number">2</div>
              <span>Checkout</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className="step-number">3</div>
              <span>Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-container">
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          {/* Left Side - Billing Details */}
          <section className="billing-section">
            <div className="section-header">
              <h2>
                <span className="section-icon">📋</span>
                Billing Information
              </h2>
              <p className="section-subtitle">Please fill out all required fields</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="form-input"
                />
                <div className="input-icon">👤</div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="form-input"
                />
                <div className="input-icon">📧</div>
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="form-input"
                />
                <div className="input-icon">📱</div>
              </div>

              <div className="form-group full-width">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="1234 Main Street, Apartment 5B"
                  required
                  className="form-input"
                />
                <div className="input-icon">🏠</div>
              </div>

              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  required
                  className="form-input"
                />
                <div className="input-icon">🏙️</div>
              </div>

              <div className="form-group">
                <label>Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="10001"
                  required
                  className="form-input"
                />
                <div className="input-icon">📮</div>
              </div>
            </div>
          </section>

          {/* Right Side - Order Summary & Payment */}
          <section className="order-section">
            {/* Order Summary */}
            <div className="order-summary">
              <div className="section-header">
                <h2>
                  <span className="section-icon">📦</span>
                  Order Summary
                </h2>
                <p className="items-count">{cartItems.length} items</p>
              </div>

              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image-container">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="quantity-badge">{item.quantity}</div>
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Shipping:</span>
                  <span className={shippingCost === 0 ? 'free-shipping' : ''}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="price-row">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="price-row total-row">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {shippingCost === 0 && (
                <div className="free-shipping-notice">
                  🎉 You qualified for free shipping!
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="payment-section">
              <div className="section-header">
                <h2>
                  <span className="section-icon">💳</span>
                  Payment Method
                </h2>
                <div className="security-badge">
                  🔒 Secure & Encrypted
                </div>
              </div>

              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  <div className="option-content">
                    <div className="option-icon">💰</div>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <p>Pay when your order arrives</p>
                    </div>
                  </div>
                  <div className="checkmark">✓</div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  <div className="option-content">
                    <div className="option-icon">💳</div>
                    <div>
                      <strong>Credit / Debit Card</strong>
                      <p>Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                  <div className="checkmark">✓</div>
                </label>
              </div>

              {formData.paymentMethod === "card" && (
                <div className="card-details">
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="form-input card-input"
                      maxLength="19"
                    />
                    <div className="card-icons">💳</div>
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="form-input card-input"
                    />
                  </div>

                  <div className="card-row">
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                        className="form-input card-input"
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVC *</label>
                      <input
                        type="text"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleChange}
                        placeholder="123"
                        required
                        className="form-input card-input"
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="success-message">
                  <span className="success-icon">✅</span>
                  {success}
                </div>
              )}
              {error && (
                <div className="error-message">
                  <span className="error-icon">❌</span>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid() || isProcessing || showSuccessPopup}
                className={`place-order-btn ${isProcessing ? 'processing' : ''}`}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Place Order - ${finalTotal.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </section>
        </form>
      </div>

      <style>{`
        ${checkoutStyles}
        
        /* Success Popup Styles */
        .success-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        
        .success-popup {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: scaleIn 0.3s ease;
        }
        
        .popup-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          animation: bounce 1s ease infinite;
        }
        
        .success-popup h3 {
          color: #28a745;
          margin-bottom: 15px;
          font-size: 1.8rem;
        }
        
        .success-popup p {
          color: #666;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </main>
  );
}

const emptyCheckoutStyles = `
  .empty-checkout {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }
  
  .empty-content {
    text-align: center;
    background: white;
    padding: 60px 40px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    max-width: 500px;
    width: 100%;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    animation: bounce 2s infinite;
  }
  
  .empty-content h2 {
    color: #333;
    margin-bottom: 15px;
    font-size: 2rem;
  }
  
  .empty-content p {
    color: #666;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
  
  .shop-link {
    display: inline-block;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.3s ease;
  }
  
  .shop-link:hover {
    transform: translateY(-3px);
    color: white;
    text-decoration: none;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const checkoutStyles = `
  * {
    box-sizing: border-box;
  }

  .checkout-main {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding-bottom: 50px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }

  .checkout-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px 0;
    margin-bottom: 40px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .checkout-title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .title-icon {
    font-size: 2.2rem;
    animation: pulse 2s infinite;
  }

  .progress-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    max-width: 600px;
    margin: 0 auto;
  }

  .progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 2;
  }

  .step-number {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 8px;
    transition: all 0.3s ease;
  }

  .progress-step.active .step-number {
    background: white;
    color: #667eea;
    box-shadow: 0 4px 15px rgba(255,255,255,0.3);
  }

  .progress-line {
    height: 4px;
    width: 100px;
    background: rgba(255,255,255,0.3);
    margin: 0 -10px;
    position: relative;
    top: -25px;
  }

  .progress-line.active {
    background: white;
  }

  .checkout-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .checkout-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }

  .billing-section,
  .order-section {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid rgba(102,126,234,0.1);
  }

  .section-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
  }

  .section-header h2 {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 8px 0;
    color: #333;
    font-size: 1.6rem;
    font-weight: 700;
  }

  .section-icon {
    font-size: 1.4rem;
  }

  .section-subtitle {
    color: #666;
    margin: 0;
    font-size: 0.95rem;
  }

  .items-count {
    color: #667eea;
    background: rgba(102,126,234,0.1);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    margin: 0;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .form-group {
    position: relative;
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .form-input {
    width: 100%;
    padding: 16px 20px 16px 50px;
    border: 2px solid #e0e6ed;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #fafbfc;
    color: #333 !important;
  }

  .form-input:focus {
    border-color: #667eea;
    outline: none;
    background: white;
    box-shadow: 0 0 0 4px rgba(102,126,234,0.1);
    color: #333 !important;
  }

  /* Card input specific styles with dark text */
  .card-input {
    color: #333 !important;
    background: white !important;
  }

  .card-input:focus {
    color: #333 !important;
    background: white !important;
  }

  .card-input::placeholder {
    color: #999 !important;
  }

  .input-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    margin-top: 12px;
    opacity: 0.6;
  }

  .order-items {
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 25px;
    padding-right: 10px;
  }

  .order-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .order-item:last-child {
    border-bottom: none;
  }

  .item-image-container {
    position: relative;
    flex-shrink: 0;
  }

  .item-image {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid #f0f0f0;
  }

  .quantity-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .item-details {
    flex: 1;
  }

  .item-details h4 {
    margin: 0 0 6px 0;
    color: #333;
    font-size: 1rem;
    font-weight: 600;
  }

  .item-price {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }

  .item-total {
    color: #667eea;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .price-breakdown {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    color: #555;
  }

  .price-row:last-child {
    margin-bottom: 0;
  }

  .total-row {
    border-top: 2px solid #e0e6ed;
    padding-top: 15px;
    margin-top: 15px;
    font-weight: 700;
    font-size: 1.2rem;
    color: #333;
  }

  .free-shipping {
    color: #28a745 !important;
    font-weight: 600;
  }

  .free-shipping-notice {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .payment-options {
    margin-bottom: 25px;
  }

  .payment-option {
    display: block;
    border: 2px solid #e0e6ed;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    background: #fafbfc;
  }

  .payment-option:hover {
    border-color: #667eea;
    background: white;
  }

  .payment-option.selected {
    border-color: #667eea;
    background: rgba(102,126,234,0.05);
  }

  .payment-option input {
    display: none;
  }

  .option-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .option-icon {
    font-size: 1.8rem;
  }

  .option-content strong {
    color: #333;
    font-size: 1.1rem;
    margin-bottom: 4px;
    display: block;
  }

  .option-content p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }

  .checkmark {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #667eea;
    font-weight: 700;
    font-size: 1.2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .payment-option.selected .checkmark {
    opacity: 1;
  }

  .security-badge {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .card-details {
    background: white;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 25px;
    border: 2px solid #667eea;
    box-shadow: 0 5px 15px rgba(102,126,234,0.1);
  }

  .card-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .card-icons {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 12px;
    font-size: 1.2rem;
  }

  .place-order-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 20px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(102,126,234,0.3);
  }

  .place-order-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102,126,234,0.4);
  }

  .place-order-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .place-order-btn.processing {
    background: #ffc107;
    color: #333;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .btn-icon {
    font-size: 1.2rem;
  }

  .trust-badges {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    flex-wrap: wrap;
  }

  .trust-badge {
    background: rgba(102,126,234,0.1);
    color: #667eea;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    flex: 1;
    min-width: 100px;
  }

  .success-message,
  .error-message {
    padding: 15px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  }

  .success-message {
    background: linear-gradient(135deg, #d4edda, #c3e6cb);
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .error-message {
    background: linear-gradient(135deg, #f8d7da, #f5c6cb);
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .success-icon,
  .error-icon {
    font-size: 1.2rem;
  }

  /* Animations */
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .checkout-form {
    animation: slideIn 0.6s ease-out;
  }

  /* Mobile Responsiveness */
  @media (max-width: 1024px) {
    .checkout-form {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    
    .billing-section,
    .order-section {
      padding: 30px;
    }
    
    .checkout-title {
      font-size: 2rem;
    }
    
    .progress-bar {
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .progress-line {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .checkout-header {
      padding: 30px 0;
    }
    
    .checkout-title {
      font-size: 1.8rem;
      flex-direction: column;
      gap: 10px;
    }
    
    .billing-section,
    .order-section {
      padding: 25px 20px;
      border-radius: 15px;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
      gap: 15px;
    }
    
    .card-row {
      grid-template-columns: 1fr;
      gap: 15px;
    }
    
    .trust-badges {
      flex-direction: column;
      gap: 8px;
    }
    
    .item-image {
      width: 60px;
      height: 60px;
    }
    
    .quantity-badge {
      width: 20px;
      height: 20px;
      font-size: 0.7rem;
    }
    
    .section-header h2 {
      font-size: 1.4rem;
    }
    
    .place-order-btn {
      padding: 18px;
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 15px;
    }
    
    .checkout-container {
      padding: 0 15px;
    }
    
    .billing-section,
    .order-section {
      padding: 20px 15px;
    }
    
    .form-input {
      padding: 14px 16px 14px 45px;
    }
    
    .input-icon {
      left: 15px;
    }
    
    .payment-option {
      padding: 15px;
    }
    
    .progress-step span {
      font-size: 0.8rem;
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }
  }

  /* Custom Scrollbar for Order Items */
  .order-items::-webkit-scrollbar {
    width: 6px;
  }

  .order-items::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .order-items::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
  }

  .order-items::-webkit-scrollbar-thumb:hover {
    background: #5a67d8;
  }

  /* Focus styles for accessibility */
  .form-input:focus,
  .place-order-btn:focus,
  .payment-option:focus-within {
    outline: 3px solid rgba(102,126,234,0.3);
    outline-offset: 2px;
  }

  /* Loading state for form inputs */
  .form-input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* Hover effects for better UX */
  .order-item:hover {
    background-color: rgba(102,126,234,0.05);
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }

  .trust-badge:hover {
    background: rgba(102,126,234,0.2);
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }

  /* Print styles */
  @media print {
    .checkout-header,
    .place-order-btn,
    .trust-badges {
      display: none;
    }
    
    .checkout-form {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    body {
      background: white;
    }
    
    .billing-section,
    .order-section {
      box-shadow: none;
      border: 1px solid #ddd;
    }
  }
`;

export default Checkout;