import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Thankyou() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header with Continue Shopping button on right */}
      <Header
        rightButton={
          <Link
            to="/"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "25px",
              fontWeight: "700",
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 4px 15px rgba(0, 123, 255, 0.6)",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              marginLeft: "auto",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Continue Shopping
          </Link>
        }
      />

      <main
        style={{
          minHeight: "calc(100vh - 160px)", // approx header + footer height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          background:
            "radial-gradient(circle at center, #e0f0ff, #a0c8ff 70%)",
          color: "#0a2342",
          textAlign: "center",
          animation: "fadeIn 1s ease forwards",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="thankyou-title"
          style={{
            fontWeight: "900",
            marginBottom: "15px",
            letterSpacing: "2px",
            textShadow: "0 3px 8px rgba(0,123,255,0.5)",
            animation: "slideUp 1s ease forwards",
            userSelect: "none",
          }}
        >
          Thank You for Your Order!
        </h1>
        <p
          className="thankyou-message"
          style={{
            lineHeight: "1.6",
            marginBottom: "50px",
            color: "#134e8e",
            animation: "slideUp 1.2s ease forwards",
            userSelect: "none",
          }}
        >
          Your order has been successfully placed. We appreciate your business and
          hope you enjoy your purchase.
        </p>

        {/* Continue to Back button */}
        <button
          onClick={() => navigate("/")}
          className="thankyou-btn"
          aria-label="Go back to previous page"
          style={{
            border: "none",
            borderRadius: "30px",
            backgroundColor: "#0056b3",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0, 86, 179, 0.7)",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            userSelect: "none",
            animation: "slideUp 1.4s ease forwards",
            padding: "14px 32px",
            fontSize: "1.2rem",
            fontWeight: "700",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#003d7a";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Continue to Back
        </button>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) }
          to { opacity: 1; transform: translateY(0) }
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .thankyou-title {
            font-size: 2.6rem !important;
            margin-bottom: 12px !important;
          }
          .thankyou-message {
            font-size: 1.2rem !important;
            max-width: 90% !important;
            margin-bottom: 40px !important;
            padding: 0 10px;
          }
          .thankyou-btn {
            font-size: 1.1rem !important;
            padding: 13px 28px !important;
            width: auto;
          }
        }

        @media (max-width: 480px) {
          .thankyou-title {
            font-size: 2rem !important;
            margin-bottom: 10px !important;
          }
          .thankyou-message {
            font-size: 1rem !important;
            max-width: 95% !important;
            margin-bottom: 30px !important;
            padding: 0 8px;
          }
          .thankyou-btn {
            font-size: 1rem !important;
            padding: 12px 24px !important;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default Thankyou;
