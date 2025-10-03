import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
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

// Products array with realistic laptop specs
const products = [
  {
    id: 1,
    name: "Dell Inspiron 15",
    price: 19.99,
    image: product1,
    specs: {
      cpu: "Intel Core i5-1135G7 (4.2 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "8 GB DDR4 3200MHz",
      storage: "512 GB NVMe SSD",
      display: "15.6\" FHD IPS, 60Hz",
      battery: "3-Cell 42Wh (up to 7 hours)",
      os: "Windows 11 Home",
      weight: "1.8 kg",
      features: "Backlit Keyboard, Wi-Fi 6, Bluetooth 5.1",
    },
    description: "Reliable everyday laptop with sharp display and fast storage. Perfect for work, study, and entertainment with excellent build quality and performance."
  },
  {
    id: 2,
    name: "HP Pavilion x360",
    price: 29.99,
    image: product2,
    specs: {
      cpu: "Intel Core i7-1165G7 (4.7 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB NVMe SSD",
      display: "14\" FHD Touchscreen IPS, 60Hz",
      battery: "3-Cell 43Wh (up to 8 hours)",
      os: "Windows 11 Home",
      weight: "1.5 kg",
      features: "360° Hinge, Fingerprint Reader, Fast Charge",
    },
    description: "Convertible laptop with touchscreen versatility. Perfect for creative work and presentations with flexible design."
  },
  {
    id: 3,
    name: "Lenovo IdeaPad 3",
    price: 39.99,
    image: product3,
    specs: {
      cpu: "AMD Ryzen 5 5500U (4.0 GHz Turbo)",
      gpu: "AMD Radeon Graphics",
      ram: "8 GB DDR4 3200MHz",
      storage: "256 GB SSD",
      display: "15.6\" FHD TN, 60Hz",
      battery: "2-Cell 38Wh (up to 6 hours)",
      os: "Windows 11 Home",
      weight: "1.65 kg",
      features: "Numeric Keypad, Dolby Audio",
    },
    description: "Budget-friendly laptop for work and study. Great value for money with reliable performance for everyday tasks."
  },
  {
    id: 4,
    name: "ASUS ROG Strix G15",
    price: 49.99,
    image: product4,
    specs: {
      cpu: "AMD Ryzen 7 6800H (4.7 GHz Turbo)",
      gpu: "NVIDIA RTX 3060 6GB GDDR6",
      ram: "16 GB DDR5 4800MHz",
      storage: "1 TB NVMe SSD",
      display: "15.6\" FHD IPS, 144Hz",
      battery: "4-Cell 90Wh (up to 9 hours)",
      os: "Windows 11 Home",
      weight: "2.3 kg",
      features: "RGB Keyboard, Wi-Fi 6E, AI Noise Canceling",
    },
    description: "High-performance gaming laptop with stunning visuals. Designed for serious gamers and content creators."
  },
  {
    id: 5,
    name: "Dell Business",
    price: 59.99,
    image: product5,
    specs: {
      cpu: "Intel Core i5-1240P (4.4 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "8 GB LPDDR4X",
      storage: "512 GB NVMe SSD",
      display: "14\" FHD IPS, 100% sRGB",
      battery: "3-Cell 56Wh (up to 12 hours)",
      os: "Windows 11 Home",
      weight: "1.2 kg",
      features: "Fingerprint Reader, Metal Body",
    },
    description: "Ultra-portable laptop with all-day battery life. Perfect for professionals who need portability and performance."
  },
  {
    id: 6,
    name: "Apple MacBook Air M1",
    price: 69.99,
    image: product6,
    specs: {
      cpu: "Apple M1 8-Core",
      gpu: "Apple 7-Core GPU",
      ram: "8 GB Unified Memory",
      storage: "256 GB SSD",
      display: "13.3\" Retina, True Tone",
      battery: "49.9Wh (up to 18 hours)",
      os: "macOS Ventura",
      weight: "1.29 kg",
      features: "Touch ID, Silent Cooling, Magic Keyboard",
    },
    description: "Powerful yet silent laptop with industry-leading battery life. Perfect for creative professionals and students."
  },
  {
    id: 7,
    name: "Microsoft Surface Laptop 4",
    price: 79.99,
    image: product7,
    specs: {
      cpu: "Intel Core i7-1185G7 (4.8 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16 GB LPDDR4x",
      storage: "512 GB SSD",
      display: "13.5\" PixelSense Touch, 3:2 Ratio",
      battery: "47.4Wh (up to 17 hours)",
      os: "Windows 11 Home",
      weight: "1.27 kg",
      features: "Windows Hello Face Unlock, Alcantara Keyboard",
    },
    description: "Elegant ultrabook with a stunning touchscreen. Premium design meets exceptional performance."
  },
  {
    id: 8,
    name: "LENOVO Ultra",
    price: 89.99,
    image: product8,
    specs: {
      cpu: "Intel Core i7-12700H (4.7 GHz Turbo)",
      gpu: "NVIDIA RTX 3070 Ti 8GB",
      ram: "16 GB DDR5",
      storage: "1 TB NVMe SSD",
      display: "15.6\" QHD IPS, 240Hz",
      battery: "80Wh (up to 8 hours)",
      os: "Windows 11 Home",
      weight: "2.01 kg",
      features: "Per-Key RGB Keyboard, CNC Aluminum Build",
    },
    description: "Premium gaming laptop with ultra-smooth visuals. Built for competitive gaming and professional content creation."
  },
  {
    id: 9,
    name: "LG Gram 17",
    price: 99.99,
    image: product9,
    specs: {
      cpu: "Intel Core i7-1260P (4.7 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16 GB LPDDR5",
      storage: "1 TB SSD",
      display: "17\" WQXGA IPS, 99% DCI-P3",
      battery: "80Wh (up to 20 hours)",
      os: "Windows 11 Home",
      weight: "1.35 kg",
      features: "Ultra-Lightweight, MIL-STD-810G Durability",
    },
    description: "Large-screen laptop that's incredibly light. Perfect for productivity with stunning display quality."
  },
  {
    id: 10,
    name: "HP Elite",
    price: 109.99,
    image: product10,
    specs: {
      cpu: "Intel Core i9-12900H (5.0 GHz Turbo)",
      gpu: "NVIDIA RTX 3060 6GB",
      ram: "32 GB DDR5",
      storage: "1 TB NVMe SSD",
      display: "16\" QHD+ IPS, 120Hz",
      battery: "90Wh (up to 9 hours)",
      os: "Windows 11 Pro",
      weight: "2.2 kg",
      features: "MiniLED Display, Thunderbolt 4",
    },
    description: "Professional creator laptop with stunning color accuracy. Designed for video editing and graphic design professionals."
  },
  {
    id: 11,
    name: "APPLE MacBook Air",
    price: 119.99,
    image: product11,
    specs: {
      cpu: "Intel Core i7-1260P (4.7 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16 GB LPDDR5",
      storage: "1 TB SSD",
      display: "14.2\" 3.1K Touch, 90Hz",
      battery: "60Wh (up to 12 hours)",
      os: "Windows 11 Home",
      weight: "1.33 kg",
      features: "Pop-up Camera, Metal Chassis",
    },
    description: "Sleek premium ultrabook with brilliant touchscreen. Elegant design with exceptional build quality."
  },
  {
    id: 12,
    name: "Gigabyte AERO 16",
    price: 1299.99,
    image: product12,
    specs: {
      cpu: "Intel Core i9-12900HK (5.0 GHz Turbo)",
      gpu: "NVIDIA RTX 3080 Ti 16GB",
      ram: "32 GB DDR5",
      storage: "2 TB NVMe SSD",
      display: "16\" 4K AMOLED HDR",
      battery: "99Wh (up to 8 hours)",
      os: "Windows 11 Pro",
      weight: "2.3 kg",
      features: "Pantone Validated Display, Creator Tools",
    },
    description: "Ultimate performance laptop for gaming and content creation. Top-tier specifications for demanding professionals."
  }
];

function SingleProduct() {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId);

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const navigate = useNavigate();

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <main style={{ 
          padding: "80px 20px", 
          textAlign: "center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#dc3545" }}>
            Product Not Found
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "30px", color: "#666" }}>
            Sorry, we couldn't find the product you're looking for.
          </p>
          <button
            onClick={() => navigate("/shop")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Back to Shop
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const MAX_QUANTITY = 5;

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value);
    
    if (isNaN(val) || val < 1) {
      val = 1;
    }
    
    if (val > MAX_QUANTITY) {
      val = MAX_QUANTITY;
      setQuantityError(`Maximum ${MAX_QUANTITY} items allowed per order`);
      setTimeout(() => setQuantityError(""), 3000);
    } else {
      setQuantityError("");
    }
    
    setQuantity(val);
  };

  const incrementQuantity = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity(prev => prev + 1);
      setQuantityError("");
    } else {
      setQuantityError(`Maximum ${MAX_QUANTITY} items allowed per order`);
      setTimeout(() => setQuantityError(""), 3000);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setQuantityError("");
    }
  };

  const handleAddToCart = () => {
    if (quantity > MAX_QUANTITY) {
      setQuantityError(`Maximum ${MAX_QUANTITY} items allowed per order`);
      setTimeout(() => setQuantityError(""), 3000);
      return;
    }
    
    addToCart(product, quantity);
    setNotification(`✓ ${quantity} x ${product.name} added to cart!`);
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Notification */}
      {notification && (
        <div style={{
          position: "fixed",
          top: "100px",
          right: "20px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "15px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 1000,
          fontSize: "14px",
          fontWeight: "600"
        }}>
          {notification}
        </div>
      )}

      {/* Quantity Error */}
      {quantityError && (
        <div style={{
          position: "fixed",
          top: "100px",
          left: "20px",
          backgroundColor: "#dc3545",
          color: "white",
          padding: "15px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 1000,
          fontSize: "14px",
          fontWeight: "600"
        }}>
          ⚠️ {quantityError}
        </div>
      )}

      <main style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "120px 20px 40px", 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
        color: "#333",
        flex: 1
      }}>
        
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "30px", fontSize: "14px" }}>
          <span 
            onClick={() => navigate("/")} 
            style={{ 
              color: "#007bff", 
              cursor: "pointer", 
              textDecoration: "underline" 
            }}
          >
            Home
          </span>
          <span style={{ margin: "0 10px", color: "#666" }}>›</span>
          <span 
            onClick={() => navigate("/shop")} 
            style={{ 
              color: "#007bff", 
              cursor: "pointer", 
              textDecoration: "underline" 
            }}
          >
            Shop
          </span>
          <span style={{ margin: "0 10px", color: "#666" }}>›</span>
          <span style={{ color: "#666" }}>{product.name}</span>
        </nav>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "60px", 
          alignItems: "start",
          marginBottom: "40px"
        }}>
          
          {/* Product Image */}
          <div style={{ textAlign: "center" }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ 
                maxWidth: "100%", 
                height: "auto",
                borderRadius: "12px", 
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease"
              }} 
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h1 style={{ 
              fontSize: "2.5rem", 
              marginBottom: "15px", 
              color: "#007bff", 
              fontWeight: "700",
              lineHeight: "1.2"
            }}>
              {product.name}
            </h1>
            
            <div className="price" style={{ 
              fontSize: "2rem", 
              fontWeight: "700", 
              color: "#28a745", 
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span>${product.price.toFixed(2)}</span>
              <span style={{ 
                fontSize: "0.8rem", 
                backgroundColor: "#28a745", 
                color: "white", 
                padding: "4px 8px", 
                borderRadius: "4px",
                fontWeight: "500"
              }}>
                In Stock
              </span>
            </div>

            <p style={{ 
              fontSize: "1.1rem", 
              marginBottom: "30px", 
              lineHeight: "1.6", 
              color: "#555",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #e9ecef"
            }}>
              {product.description}
            </p>

            {/* Specifications */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ 
                fontSize: "1.4rem", 
                marginBottom: "15px", 
                color: "#333",
                fontWeight: "600"
              }}>
                Specifications
              </h3>
              <div className="specs-grid" style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                gap: "10px"
              }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} style={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    padding: "12px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "6px",
                    border: "1px solid #e9ecef"
                  }}>
                    <strong style={{ 
                      textTransform: "capitalize", 
                      color: "#495057",
                      fontSize: "0.9rem"
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </strong>
                    <span style={{ 
                      color: "#007bff",
                      fontSize: "0.9rem",
                      fontWeight: "500"
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="quantity-cart-section" style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px", 
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#ffffff",
              border: "2px solid #e9ecef",
              borderRadius: "12px",
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label htmlFor="quantity" style={{ 
                  fontWeight: "600", 
                  fontSize: "16px", 
                  userSelect: "none",
                  color: "#495057"
                }}>
                  Quantity:
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: quantity <= 1 ? "#e9ecef" : "#007bff",
                      color: quantity <= 1 ? "#6c757d" : "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: quantity <= 1 ? "not-allowed" : "pointer",
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    -
                  </button>
                  
                  <input 
                    id="quantity" 
                    type="number" 
                    min={1} 
                    max={MAX_QUANTITY} 
                    value={quantity} 
                    onChange={handleQuantityChange} 
                    style={{ 
                      width: "70px", 
                      padding: "10px", 
                      borderRadius: "6px", 
                      border: "2px solid #ced4da", 
                      fontSize: "16px", 
                      textAlign: "center",
                      fontWeight: "600",
                      MozAppearance: "textfield"
                    }} 
                  />
                  
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= MAX_QUANTITY}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: quantity >= MAX_QUANTITY ? "#e9ecef" : "#007bff",
                      color: quantity >= MAX_QUANTITY ? "#6c757d" : "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: quantity >= MAX_QUANTITY ? "not-allowed" : "pointer",
                      fontSize: "18px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    +
                  </button>
                </div>
                <span style={{ 
                  fontSize: "0.8rem", 
                  color: "#6c757d",
                  marginLeft: "10px"
                }}>
                  (Max: {MAX_QUANTITY})
                </span>
              </div>
              
              <button
                onClick={handleAddToCart}
                style={{
                  padding: "14px 30px",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "700",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  flex: "1",
                  minWidth: "200px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 123, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.3)";
                }}
              >
                Add to Cart
              </button>
            </div>

            {/* Additional Actions */}
            <div className="additional-actions" style={{ 
              display: "flex", 
              gap: "15px", 
              flexWrap: "wrap"
            }}>
              <button
                onClick={() => navigate("/cart")}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#28a745",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  flex: "1",
                  minWidth: "140px"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
              >
                View Cart
              </button>
              
              <button
                onClick={() => navigate("/shop")}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  flex: "1",
                  minWidth: "140px"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a6268")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Product Features Section */}
        <div style={{ 
          marginTop: "60px",
          padding: "40px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          border: "1px solid #e9ecef"
        }}>
          <h3 style={{ 
            fontSize: "1.8rem", 
            marginBottom: "25px", 
            color: "#333",
            fontWeight: "600",
            textAlign: "center"
          }}>
            Key Features
          </h3>
          <div className="features-grid" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "20px"
          }}>
            {product.specs.features && product.specs.features.split(', ').map((feature, index) => (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center",
                gap: "12px",
                padding: "15px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                <span style={{ 
                  fontSize: "1.2rem", 
                  color: "#28a745" 
                }}>✓</span>
                <span style={{ 
                  fontSize: "1rem",
                  color: "#495057"
                }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Responsive Styles */}
        <style>
          {`
            /* Hide number input arrows */
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            
            input[type="number"] {
              -moz-appearance: textfield;
            }
            
            @media (max-width: 768px) {
              main > div:first-of-type {
                grid-template-columns: 1fr !important;
                gap: 30px !important;
                text-align: center;
              }
              
              .product-details h1 {
                font-size: 2rem !important;
              }
              
              .product-details .price {
                font-size: 1.5rem !important;
              }
              
              .quantity-cart-section {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 15px !important;
              }
              
              .quantity-cart-section > div:first-child {
                justify-content: center !important;
                flex-wrap: wrap !important;
              }
              
              .quantity-cart-section input {
                width: 80px !important;
              }
              
              .quantity-cart-section button {
                width: 100% !important;
              }
              
              .additional-actions {
                justify-content: center !important;
              }
              
              .additional-actions button {
                flex: 1;
                min-width: 140px;
              }
              
              .specs-grid {
                grid-template-columns: 1fr !important;
              }
              
              .features-grid {
                grid-template-columns: 1fr !important;
              }
            }
            
            @media (max-width: 480px) {
              .product-details h1 {
                font-size: 1.8rem !important;
              }
              
              .additional-actions {
                flex-direction: column !important;
              }
              
              .additional-actions button {
                width: 100% !important;
              }
              
              .quantity-cart-section > div:first-child {
                flex-direction: column !important;
                gap: 10px !important;
              }
            }
          `}
        </style>
      </main>
    
    </div>
  );
}

export default SingleProduct;