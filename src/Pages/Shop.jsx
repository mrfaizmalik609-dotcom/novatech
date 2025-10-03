import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import product1 from "../assets/images/product-1.jpg";
import product2 from "../assets/images/product-2.jpg";
import product3 from "../assets/images/product-3.jpg";
import product4 from "../assets/images/product-4.jpg";
import product5 from "../assets/images/product-5.jpg";
import product6 from "../assets/images/product-6.jpg";
import product7 from "../assets/images/product-7.jpg";
import product8 from "../assets/images/product-8.jpg";
import product9 from "../assets/images/product-9.jpg";
import product10 from "../assets/images/product-10.jpg";
import product11 from "../assets/images/product-11.jpg";
import product12 from "../assets/images/product-12.jpg";

const products = [
  { id: 1, name: "HP Laptop", price: 19.99, image: product1, ram: "8 GB", battery: "4000 mAh", description: "High performance laptop with long battery life." },
  { id: 2, name: "HP Premium", price: 29.99, image: product2, ram: "16 GB", battery: "4500 mAh", description: "Powerful laptop with premium display." },
  { id: 3, name: "Lenovo IdeaPad 3", price: 39.99, image: product3, ram: "8 GB", battery: "5000 mAh", description: "Lightweight and portable laptop for everyday use." },
  { id: 4, name: "ASUS ROG Strix G15", price: 49.99, image: product4, ram: "32 GB", battery: "6000 mAh", description: "High-end gaming laptop with RGB keyboard." },
  { id: 5, name: "DELL Business", price: 59.99, image: product5, ram: "16 GB", battery: "4800 mAh", description: "Business laptop with robust security features." },
  { id: 6, name: "Apple MacBook Air M1", price: 69.99, image: product6, ram: "8 GB", battery: "4000 mAh", description: "Affordable laptop with great performance." },
  { id: 7, name: "Microsoft Surface Laptop 4", price: 79.99, image: product7, ram: "24 GB", battery: "5200 mAh", description: "Creative laptop optimized for multimedia tasks." },
  { id: 8, name: "LENOVO Ultra", price: 89.99, image: product8, ram: "16 GB", battery: "5500 mAh", description: "Ultra-thin laptop with long-lasting battery." },
  { id: 9, name: "LENOVO ProLG Gram 17", price: 99.99, image: product9, ram: "32 GB", battery: "6000 mAh", description: "Premium laptop for professionals and developers." },
  { id: 10, name: "HP Elite", price: 109.99, image: product10, ram: "64 GB", battery: "7000 mAh", description: "Top-tier laptop with ultimate specs." },
  { id: 11, name: "APPLE MacBook Air", price: 119.99, image: product11, ram: "32 GB", battery: "6500 mAh", description: "High-performance laptop with advanced features." },
  { id: 12, name: "Gigabyte AERO 16", price: 129.99, image: product12, ram: "16 GB", battery: "8000 mAh", description: "Sleek MacBook with Retina display and all-day battery life." },
];

function Shop() {
  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    products.forEach((p) => {
      initial[p.id] = 1;
    });
    return initial;
  });

  const { addToCart, showCartMessage, cartMessage } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, value) => {
    let val = parseInt(value);
    if (isNaN(val) || val < 1) val = 1;
    else if (val > 99) val = 99;
    setQuantities((prev) => ({ ...prev, [productId]: val }));
  };

  const handleAddToCart = (product) => {
    addToCart(product, quantities[product.id]);
  };

  const handleBuyNow = (product) => {
    addToCart(product, quantities[product.id]);
    navigate("/checkout");
  };

  const buttonStyleBlue = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "background-color 0.3s ease",
  };

  const buttonStyleGreen = {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "background-color 0.3s ease",
  };

  const productCardStyle = {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 20,
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <style jsx>{`
        @media (max-width: 768px) {
          .shop-container {
            padding: 15px !important;
          }
          .shop-title {
            font-size: 28px !important;
            margin-bottom: 30px !important;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .product-card {
            padding: 15px !important;
          }
          .product-image {
            height: 150px !important;
          }
          .product-name {
            font-size: 16px !important;
          }
          .product-price {
            font-size: 16px !important;
          }
          .product-description {
            font-size: 12px !important;
          }
          .product-specs {
            font-size: 12px !important;
          }
          .cart-notification {
            left: 10px !important;
            right: 10px !important;
            top: 10px !important;
            font-size: 14px !important;
          }
        }
        
        @media (max-width: 480px) {
          .shop-container {
            padding: 10px !important;
          }
          .shop-title {
            font-size: 24px !important;
            margin-bottom: 25px !important;
          }
          .products-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          .product-card {
            padding: 15px !important;
          }
          .product-image {
            height: 180px !important;
          }
          .product-name {
            font-size: 18px !important;
          }
          .product-price {
            font-size: 17px !important;
          }
          .product-description {
            font-size: 13px !important;
          }
          .product-specs {
            font-size: 13px !important;
          }
          .quantity-section {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .action-buttons {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .cart-notification {
            padding: 8px 15px !important;
          }
        }
      `}</style>

      {/* Cart Message Notification */}
      {showCartMessage && (
        <div
          className="cart-notification"
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
            fontWeight: "600",
          }}
        >
          {cartMessage}
        </div>
      )}

      {/* Page Title */}
      <h1 className="shop-title" style={{ textAlign: "center", marginBottom: 40, fontSize: 36, color: "#333" }}>
        Our Products
      </h1>

      {/* Products Grid */}
      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 30,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            style={productCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            {/* Product Image with Link */}
            <Link to={`/product/${product.id}`} style={{ width: "100%" }}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 15,
                  cursor: "pointer",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Link>

            {/* Product Name */}
            <h3
              className="product-name"
              style={{
                margin: "0 0 10px",
                fontSize: 20,
                textAlign: "center",
                color: "#333",
              }}
            >
              {product.name}
            </h3>
            
            {/* Product Price */}
            <p
              className="product-price"
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 10,
                color: "#007bff",
              }}
            >
              ${product.price.toFixed(2)}
            </p>

            {/* Product Description */}
            <p
              className="product-description"
              style={{
                fontSize: 14,
                color: "#666",
                marginBottom: 10,
                lineHeight: 1.4,
              }}
            >
              {product.description}
            </p>

            {/* Product Specifications */}
            <div
              className="product-specs"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 15,
                fontSize: 14,
                color: "#555",
              }}
            >
              <span>RAM: {product.ram}</span>
              <span>Battery: {product.battery}</span>
            </div>

            {/* Quantity Selector */}
            <div
              className="quantity-section"
              style={{
                marginBottom: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <label
                htmlFor={`qty-${product.id}`}
                style={{ fontWeight: 600, userSelect: "none" }}
              >
                Quantity:
              </label>
              <input
                id={`qty-${product.id}`}
                type="number"
                min={1}
                max={99}
                value={quantities[product.id]}
                onChange={(e) =>
                  handleQuantityChange(product.id, e.target.value)
                }
                style={{
                  width: 60,
                  padding: 6,
                  borderRadius: 5,
                  border: "1px solid #ccc",
                  textAlign: "center",
                  fontSize: 16,
                }}
              />
            </div>

            {/* Action Buttons */}
            <div
              className="action-buttons"
              style={{
                display: "flex",
                gap: 10,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => handleAddToCart(product)}
                style={buttonStyleBlue}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007bff")
                }
              >
                Add to Cart
              </button>

              <button
                onClick={() => handleBuyNow(product)}
                style={buttonStyleGreen}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1e7e34")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#28a745")
                }
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;