import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { db } from "../Firebase"; // Apna Firebase path
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Checkout() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod", // cod or card
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
    }
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!isFormValid()) {
      alert("Please fill all required fields");
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
        total: totalPrice,
        timestamp: serverTimestamp(),
      });

      setSuccess("Order placed successfully!");
      setFormData({
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

      navigate("/thankyou");
    } catch (err) {
      console.error("Firestore Error:", err);
      setError("Failed to place order. Please try again later.");
    }
  };

  if (cartItems.length === 0)
    return (
      <main style={{ textAlign: "center", marginTop: 150 }}>
        <h2>Your cart is empty.</h2>
        <p>Please add products to your cart before checking out.</p>
        <Link
          to="/shop"
          style={{
            color: "#007bff",
            fontWeight: "600",
            textDecoration: "underline",
          }}
        >
          Go to Shop
        </Link>
      </main>
    );

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "100px auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>Checkout</h1>

      <form
        onSubmit={handlePlaceOrder}
        style={{
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Billing Details */}
        <section
          style={{
            flex: "1 1 450px",
            border: "2px solid black",
            padding: 30,
            borderRadius: 12,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            minWidth: 320,
          }}
        >
          <h2
            style={{
              marginBottom: 25,
              borderBottom: "3px solid #007bff",
              paddingBottom: 12,
              fontWeight: "700",
              fontSize: 24,
              color: "#007bff",
            }}
          >
            Billing Details
          </h2>

          {[
            { label: "Full Name *", name: "fullName", type: "text", placeholder: "John Doe" },
            { label: "Email Address *", name: "email", type: "email", placeholder: "you@example.com" },
            { label: "Phone Number *", name: "phone", type: "tel", placeholder: "+1 234 567 890" },
            { label: "Address *", name: "address", type: "text", placeholder: "1234 Main St" },
            { label: "City *", name: "city", type: "text", placeholder: "New York" },
            { label: "Postal Code *", name: "postalCode", type: "text", placeholder: "10001" },
          ].map(({ label, name, type, placeholder }) => (
            <label key={name} style={{ display: "block", marginBottom: 20, fontWeight: 600 }}>
              {label}
              <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} required style={inputStyle} />
            </label>
          ))}
        </section>

        {/* Order Summary + Payment */}
        <section
          style={{
            flex: "1 1 450px",
            border: "2px solid black",
            padding: 30,
            borderRadius: 12,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <h2 style={{ marginBottom: 25, borderBottom: "3px solid #007bff", paddingBottom: 12, fontWeight: "700", fontSize: 24, color: "#007bff" }}>
              Order Summary
            </h2>

            <div
              style={{
                maxHeight: 320,
                overflowY: "auto",
                paddingRight: 5,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: 15,
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 10,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: "600", color: "#222" }}>{item.name}</h3>
                    <p style={{ margin: "4px 0", fontWeight: "600" }}>Qty: {item.quantity}</p>
                    <p style={{ margin: 0, fontWeight: "700", color: "#007bff" }}>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr style={{ margin: "25px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: 22, color: "#007bff" }}>
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ marginTop: 35 }}>
            <h2 style={{ marginBottom: 20, borderBottom: "3px solid #007bff", paddingBottom: 10, fontWeight: "700", fontSize: 22, color: "#007bff" }}>
              Payment Method
            </h2>

            <label style={{ display: "block", marginBottom: 12, cursor: "pointer", fontWeight: "600", fontSize: 16 }}>
              <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleChange} style={{ marginRight: 10 }} />
              Cash on Delivery
            </label>

            <label style={{ display: "block", marginBottom: 20, cursor: "pointer", fontWeight: "600", fontSize: 16 }}>
              <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === "card"} onChange={handleChange} style={{ marginRight: 10 }} />
              Credit / Debit Card
            </label>

            {formData.paymentMethod === "card" && (
              <>
                <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="cardName" placeholder="Name on Card" value={formData.cardName} onChange={handleChange} required style={inputStyle} />
                <div style={{ display: "flex", gap: 15, marginBottom: 15, flexWrap: "wrap" }}>
                  <input type="text" name="cardExpiry" placeholder="Expiry Date (MM/YY)" value={formData.cardExpiry} onChange={handleChange} required style={{ ...inputStyle, flex: "1 1 130px" }} />
                  <input type="text" name="cardCVC" placeholder="CVC" value={formData.cardCVC} onChange={handleChange} required style={{ ...inputStyle, flex: "1 1 130px" }} />
                </div>
              </>
            )}

            {success && <p style={{ color: "green", fontWeight: "600" }}>{success}</p>}
            {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}

            <button
              type="submit"
              disabled={!isFormValid()}
              style={{
                marginTop: 10,
                backgroundColor: isFormValid() ? "#007bff" : "#bbb",
                color: "white",
                border: "none",
                padding: "16px 0",
                width: "100%",
                borderRadius: 8,
                fontSize: 20,
                fontWeight: "700",
                cursor: isFormValid() ? "pointer" : "not-allowed",
                transition: "background-color 0.3s ease",
                boxShadow: "0 4px 8px rgba(0,123,255,0.5)",
              }}
            >
              Place Order
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
  transition: "border-color 0.3s",
  backgroundColor: "white",
};

export default Checkout;
