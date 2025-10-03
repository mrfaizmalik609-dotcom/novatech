import React from "react";
import { useParams, Link } from "react-router-dom";
import home1 from "../assets/images/home-1.jpg";
import home2 from "../assets/images/home-2.jpg";
import home3 from "../assets/images/home-3.jpg";
import home4 from "../assets/images/home-4.jpg";
import home5 from "../assets/images/home-5.jpg";
import home6 from "../assets/images/home-6.jpg";

const products = {
  home1: {
    img: home1,
    name: "Gaming Laptop X1",
    description:
      "This powerhouse is designed for gamers and creators. Experience smooth frame rates with RTX 3060 GPU and enjoy immersive visuals on a 144Hz display.",
    suitableFor:
      "Ideal for serious gamers, VR enthusiasts, 3D artists, and video editors who require top-tier graphics performance and fast processing.",
    benefits: [
      "High refresh rate for smooth gameplay",
      "Advanced cooling system for long gaming sessions",
      "RGB backlit keyboard for customization",
      "Powerful GPU accelerates rendering and editing tasks",
    ],
    notes:
      "Due to its high performance components, it is slightly heavier and has moderate battery life. Perfect for desktop replacement or on-the-go gaming setups.",
  },
  home2: {
    img: home2,
    name: "Ultrabook Z3",
    description:
      "Lightweight and sleek ultrabook designed for professionals and students needing excellent battery life and portability without sacrificing speed.",
    suitableFor:
      "Best suited for business users, travelers, and students who value a slim design and all-day battery life for productivity apps and media consumption.",
    benefits: [
      "Ultra-thin and light for easy carrying",
      "Fingerprint sensor for quick and secure login",
      "Fast SSD storage ensures quick boot times",
      "Bright, anti-glare display perfect for office and outdoor use",
    ],
    notes:
      "Not designed for heavy gaming or graphics work, but excels at everyday computing, video conferencing, and multitasking.",
  },
  home3: {
    img: home3,
    name: "Business Laptop B7",
    description:
      "Reliable and secure business laptop with solid performance and great battery life to keep your workday productive and efficient.",
    suitableFor:
      "Corporate users, remote workers, and professionals needing robust security features and dependable performance for office software and communications.",
    benefits: [
      "Long battery life to last through meetings",
      "Built-in security to protect sensitive data",
      "Comfortable keyboard and professional design",
      "Multiple connectivity options for peripherals",
    ],
    notes:
      "Optimized for business productivity rather than gaming or creative work. Lightweight enough to carry between meetings.",
  },
  home4: {
    img: home4,
    name: "Student Laptop S2",
    description:
      "Affordable and practical laptop designed to handle everyday student tasks, including research, writing, and streaming lectures.",
    suitableFor:
      "Students and casual users who need a reliable device for studying, browsing, and light multimedia use.",
    benefits: [
      "Budget-friendly price point",
      "Good battery life for all-day use",
      "Lightweight and portable",
      "Solid performance for web and office apps",
    ],
    notes:
      "Not suitable for demanding software or gaming, but excellent for educational needs and casual use.",
  },
  home5: {
    img: home5,
    name: "2-in-1 Convertible C5",
    description:
      "Flexible 2-in-1 laptop and tablet that adapts to your needs with touch screen and stylus support, perfect for creatives and note takers.",
    suitableFor:
      "Ideal for artists, designers, students, and professionals who want both laptop productivity and tablet convenience.",
    benefits: [
      "Versatile convertible design",
      "Responsive touch screen with stylus support",
      "Lightweight and compact",
      "Good battery life for all-day use",
    ],
    notes:
      "Great for sketching, note-taking, and presentations. Not optimized for heavy-duty gaming or rendering.",
  },
  home6: {
    img: home6,
    name: "Workstation W9",
    description:
      "Top-tier workstation for creative professionals requiring heavy computing power for 3D modeling, video editing, and large data processing.",
    suitableFor:
      "Engineers, animators, video producers, and anyone working with resource-intensive professional software.",
    benefits: [
      "Extreme performance with Intel Xeon CPU and NVIDIA Quadro GPU",
      "Massive RAM and storage options",
      "17.3\" 4K UHD display for stunning visuals",
      "Designed for sustained heavy workloads",
    ],
    notes:
      "This is a desktop replacement; it’s heavy and has limited battery life but unbeatable performance.",
  },
};

function Homepagedata() {
  const { id } = useParams();
  const product = products[id];

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Product Not Found</h2>
        <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "80px auto 40px",
        padding: "30px 25px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 5px 30px rgba(0,0,0,0.1)",
        borderRadius: "14px",
        backgroundColor: "#fff",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#007bff",
          fontWeight: "600",
          marginBottom: "25px",
          display: "inline-block",
          fontSize: "1.1rem",
        }}
      >
        ← Back to Home
      </Link>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            flex: "1 1 420px",
            maxWidth: "420px",
            minWidth: "280px",
            borderRight: "1px solid #eee",
            overflow: "hidden",
          }}
        >
          <img
            src={product.img}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: "16px 0 0 16px",
              boxShadow: "inset 0 0 15px rgba(0,0,0,0.05)",
            }}
          />
        </div>

        <div
          style={{
            flex: "1 1 460px",
            minWidth: "280px",
            padding: "25px 30px",
            color: "#222",
          }}
        >
          <h1
            style={{
              marginBottom: "18px",
              color: "#0a2342",
              fontWeight: "700",
              fontSize: "2.2rem",
              lineHeight: "1.1",
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#444",
              marginBottom: "25px",
              lineHeight: "1.6",
              letterSpacing: "0.02em",
            }}
          >
            {product.description}
          </p>

          <h3
            style={{
              fontSize: "1.3rem",
              color: "#b38a00",
              fontWeight: "600",
              borderBottom: "2px solid #b38a00",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}
          >
            Suitable For
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "#555",
              marginBottom: "25px",
              fontStyle: "italic",
              lineHeight: "1.5",
            }}
          >
            {product.suitableFor}
          </p>

          <h3
            style={{
              fontSize: "1.3rem",
              color: "#0a2342",
              fontWeight: "600",
              borderBottom: "2px solid #0a2342",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}
          >
            Benefits
          </h3>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "20px",
              color: "#444",
              fontSize: "1rem",
              marginBottom: "25px",
            }}
          >
            {product.benefits.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "8px" }}>
                {item}
              </li>
            ))}
          </ul>

          <h3
            style={{
              fontSize: "1.3rem",
              color: "#777",
              fontWeight: "600",
              borderBottom: "2px solid #ddd",
              paddingBottom: "8px",
              marginBottom: "15px",
            }}
          >
            Notes
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#666",
              fontStyle: "italic",
              lineHeight: "1.4",
            }}
          >
            {product.notes}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepagedata;
