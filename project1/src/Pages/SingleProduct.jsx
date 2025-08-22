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
    price: 599.99,
    image: product1,
    specs: {
      cpu: "Intel Core i5-1135G7 (4.2 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "8 GB DDR4 3200MHz",
      storage: "512 GB NVMe SSD",
      display: "15.6” FHD IPS, 60Hz",
      battery: "3-Cell 42Wh (up to 7 hours)",
      os: "Windows 11 Home",
      weight: "1.8 kg",
      features: "Backlit Keyboard, Wi-Fi 6, Bluetooth 5.1",
    },
    description: "Reliable everyday laptop with sharp display and fast storage."
  },
  {
    id: 2,
    name: "HP Pavilion x360",
    price: 749.99,
    image: product2,
    specs: {
      cpu: "Intel Core i7-1165G7 (4.7 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB NVMe SSD",
      display: "14” FHD Touchscreen IPS, 60Hz",
      battery: "3-Cell 43Wh (up to 8 hours)",
      os: "Windows 11 Home",
      weight: "1.5 kg",
      features: "360° Hinge, Fingerprint Reader, Fast Charge",
    },
    description: "Convertible laptop with touchscreen versatility."
  },
  {
    id: 3,
    name: "Lenovo IdeaPad 3",
    price: 529.99,
    image: product3,
    specs: {
      cpu: "AMD Ryzen 5 5500U (4.0 GHz Turbo)",
      gpu: "AMD Radeon Graphics",
      ram: "8 GB DDR4 3200MHz",
      storage: "256 GB SSD",
      display: "15.6” FHD TN, 60Hz",
      battery: "2-Cell 38Wh (up to 6 hours)",
      os: "Windows 11 Home",
      weight: "1.65 kg",
      features: "Numeric Keypad, Dolby Audio",
    },
    description: "Budget-friendly laptop for work and study."
  },
  {
    id: 4,
    name: "ASUS ROG Strix G15",
    price: 1299.99,
    image: product4,
    specs: {
      cpu: "AMD Ryzen 7 6800H (4.7 GHz Turbo)",
      gpu: "NVIDIA RTX 3060 6GB GDDR6",
      ram: "16 GB DDR5 4800MHz",
      storage: "1 TB NVMe SSD",
      display: "15.6” FHD IPS, 144Hz",
      battery: "4-Cell 90Wh (up to 9 hours)",
      os: "Windows 11 Home",
      weight: "2.3 kg",
      features: "RGB Keyboard, Wi-Fi 6E, AI Noise Canceling",
    },
    description: "High-performance gaming laptop with stunning visuals."
  },
  {
    id: 5,
    name: "Acer Swift 3",
    price: 679.99,
    image: product5,
    specs: {
      cpu: "Intel Core i5-1240P (4.4 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "8 GB LPDDR4X",
      storage: "512 GB NVMe SSD",
      display: "14” FHD IPS, 100% sRGB",
      battery: "3-Cell 56Wh (up to 12 hours)",
      os: "Windows 11 Home",
      weight: "1.2 kg",
      features: "Fingerprint Reader, Metal Body",
    },
    description: "Ultra-portable laptop with all-day battery life."
  },
  {
    id: 6,
    name: "Apple MacBook Air M1",
    price: 999.99,
    image: product6,
    specs: {
      cpu: "Apple M1 8-Core",
      gpu: "Apple 7-Core GPU",
      ram: "8 GB Unified Memory",
      storage: "256 GB SSD",
      display: "13.3” Retina, True Tone",
      battery: "49.9Wh (up to 18 hours)",
      os: "macOS Ventura",
      weight: "1.29 kg",
      features: "Touch ID, Silent Cooling, Magic Keyboard",
    },
    description: "Powerful yet silent laptop with industry-leading battery life."
  },
  {
    id: 7,
    name: "Microsoft Surface Laptop 4",
    price: 1149.99,
    image: product7,
    specs: {
      cpu: "Intel Core i7-1185G7 (4.8 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16 GB LPDDR4x",
      storage: "512 GB SSD",
      display: "13.5” PixelSense Touch, 3:2 Ratio",
      battery: "47.4Wh (up to 17 hours)",
      os: "Windows 11 Home",
      weight: "1.27 kg",
      features: "Windows Hello Face Unlock, Alcantara Keyboard",
    },
    description: "Elegant ultrabook with a stunning touchscreen."
  },
  {
    id: 8,
    name: "Razer Blade 15",
    price: 1899.99,
    image: product8,
    specs: {
      cpu: "Intel Core i7-12700H (4.7 GHz Turbo)",
      gpu: "NVIDIA RTX 3070 Ti 8GB",
      ram: "16 GB DDR5",
      storage: "1 TB NVMe SSD",
      display: "15.6” QHD IPS, 240Hz",
      battery: "80Wh (up to 8 hours)",
      os: "Windows 11 Home",
      weight: "2.01 kg",
      features: "Per-Key RGB Keyboard, CNC Aluminum Build",
    },
    description: "Premium gaming laptop with ultra-smooth visuals."
  },
  {
    id: 9,
    name: "LG Gram 17",
    price: 1399.99,
    image: product9,
    specs: {
      cpu: "Intel Core i7-1260P (4.7 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16 GB LPDDR5",
      storage: "1 TB SSD",
      display: "17” WQXGA IPS, 99% DCI-P3",
      battery: "80Wh (up to 20 hours)",
      os: "Windows 11 Home",
      weight: "1.35 kg",
      features: "Ultra-Lightweight, MIL-STD-810G Durability",
    },
    description: "Large-screen laptop that's incredibly light."
  },
  {
    id: 10,
    name: "MSI Creator Z16",
    price: 2199.99,
    image: product10,
    specs: {
      cpu: "Intel Core i9-12900H (5.0 GHz Turbo)",
      gpu: "NVIDIA RTX 3060 6GB",
      ram: "32 GB DDR5",
      storage: "1 TB NVMe SSD",
      display: "16” QHD+ IPS, 120Hz",
      battery: "90Wh (up to 9 hours)",
      os: "Windows 11 Pro",
      weight: "2.2 kg",
      features: "MiniLED Display, Thunderbolt 4",
    },
    description: "Professional creator laptop with stunning color accuracy."
  },
  {
    id: 11,
    name: "Huawei MateBook X Pro",
    price: 1599.99,
    image: product11,
    specs: {
      cpu: "Intel Core i7-1260P (4.7 GHz Turbo)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16 GB LPDDR5",
      storage: "1 TB SSD",
      display: "14.2” 3.1K Touch, 90Hz",
      battery: "60Wh (up to 12 hours)",
      os: "Windows 11 Home",
      weight: "1.33 kg",
      features: "Pop-up Camera, Metal Chassis",
    },
    description: "Sleek premium ultrabook with brilliant touchscreen."
  },
  {
    id: 12,
    name: "Gigabyte AERO 16",
    price: 2499.99,
    image: product12,
    specs: {
      cpu: "Intel Core i9-12900HK (5.0 GHz Turbo)",
      gpu: "NVIDIA RTX 3080 Ti 16GB",
      ram: "32 GB DDR5",
      storage: "2 TB NVMe SSD",
      display: "16” 4K AMOLED HDR",
      battery: "99Wh (up to 8 hours)",
      os: "Windows 11 Pro",
      weight: "2.3 kg",
      features: "Pantone Validated Display, Creator Tools",
    },
    description: "Ultimate performance laptop for gaming and content creation."
  }
];

function SingleProduct() {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId);

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!product) {
    return (
      <>
        <Header />
        <main style={{ padding: 40, textAlign: "center" }}>
          <h2>Product Not Found</h2>
          <button
            onClick={() => navigate("/shop")}
            style={{
              marginTop: 20,
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Back to Shop
          </button>
        </main>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    else if (val > 99) val = 99;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  return (
    <>
      <Header />
      <main style={{ maxWidth: 900, margin: "100px auto", padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          <img src={product.image} alt={product.name} style={{ maxWidth: 400, width: "100%", borderRadius: 12, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }} />
          <div style={{ maxWidth: 400 }}>
            <h1 style={{ fontSize: "2.2rem", marginBottom: 20, color: "#007bff", fontWeight: "700" }}>{product.name}</h1>
            <p style={{ fontSize: 20, fontWeight: "700", color: "#134e8e", marginBottom: 20 }}>Price: ${product.price.toFixed(2)}</p>
            
            {/* Display all specs */}
            <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} style={{ fontSize: 16, marginBottom: 6 }}>
                  <strong style={{ textTransform: "capitalize" }}>{key}:</strong> {value}
                </li>
              ))}
            </ul>

            <p style={{ fontSize: 16, marginBottom: 30, lineHeight: 1.5, color: "#444" }}>{product.description}</p>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <label htmlFor="quantity" style={{ fontWeight: 600, fontSize: 16, userSelect: "none" }}>Quantity:</label>
              <input id="quantity" type="number" min={1} max={99} value={quantity} onChange={handleQuantityChange} style={{ width: 70, padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, textAlign: "center" }} />
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                padding: "14px 28px",
                backgroundColor: "#007bff",
                color: "white",
                fontSize: 18,
                fontWeight: "700",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default SingleProduct;
