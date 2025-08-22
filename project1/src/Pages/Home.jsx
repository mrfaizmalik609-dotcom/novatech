import React from "react";
import { Link } from "react-router-dom";
import homeImage from "../assets/images/laptop-1.jpg";
import home1 from "../assets/images/home-1.jpg";
import home2 from "../assets/images/home-2.jpg";
import home3 from "../assets/images/home-3.jpg";
import home4 from "../assets/images/home-4.jpg";
import home5 from "../assets/images/home-5.jpg";
import home6 from "../assets/images/home-6.jpg";

function Home() {
  const products = [
    { id: "home1", img: home1 },
    { id: "home2", img: home2 },
    { id: "home3", img: home3 },
    { id: "home4", img: home4 },
    { id: "home5", img: home5 },
    { id: "home6", img: home6 },
  ];

  return (
    <div style={{ textAlign: "center", marginBottom: "40px", marginTop: "0" }}>
      <style>{`
        .home-container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 1rem;
        }

        .home-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
        }

        .home-card {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .home-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0,0,0,0.2);
        }

        .home-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 8px 8px 0 0;
          transition: transform 0.4s ease;
        }

        .home-img:hover {
          transform: scale(1.05);
        }

        /* Responsive text sizing */
        .home-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          margin-bottom: 1rem;
          color: #0a2342;
        }

        .home-description {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          line-height: 1.6;
          color: #333;
          margin-bottom: 2rem;
        }

        /* Fancy Gradient Button */
        .open-overlay-btn {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ffdd00, #d4af37);
          color: #0a0f2c;
          font-weight: 600;
          text-align: center;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .open-overlay-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        /* Responsive layout adjustments */
        @media (max-width: 768px) {
          .home-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            padding: 0.5rem;
          }

          .home-card {
            margin-bottom: 1rem;
          }

          .home-img {
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .home-container {
            padding: 0.5rem;
          }

          .home-grid {
            grid-template-columns: 1fr;
          }

          .open-overlay-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
          font-size: 0.85rem;
          padding: 6px 14px;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(212, 175, 55, 0.5);
        }
        .open-overlay-btn:hover {
          background: linear-gradient(135deg, #ffe766, #b38a00);
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(179, 138, 0, 0.7);
        }

        .banner-container {
          position: relative;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto 20px auto;
        }
        .banner-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }
        .shop-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          background-color: #d4af37;
          padding: 14px 32px;
          border-radius: 50px;
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.6);
          font-weight: 700;
          font-size: 1.2rem;
          color: #0a0f2c;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          z-index: 10;
        }
        .shop-btn:hover {
          background-color: #b38a00;
          box-shadow: 0 10px 25px rgba(179, 138, 0, 0.8);
        }
        @media (max-width: 768px) {
          .shop-btn {
            font-size: 1rem;
            padding: 10px 20px;
          }
        }
        .image-grid {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
      `}</style>

      {/* Main Banner */}
      <div className="banner-container">
        <img src={homeImage} alt="Laptop" className="banner-img" />
        <div
          className="shop-btn"
          onClick={() => (window.location.href = "/Shop")}
        >
          Shop Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "12px" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            width="24"
            height="24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* First Row */}
      <div className="image-grid">
        {products.slice(0, 3).map(({ id, img }) => (
          <div className="home-card" key={id}>
            <Link to={`/homepagedata/${id}`}>
              <img src={img} alt={id} className="home-img" />
            </Link>
            <Link to={`/homepagedata/${id}`} className="open-overlay-btn">
              Learn More
            </Link>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="image-grid">
        {products.slice(3).map(({ id, img }) => (
          <div className="home-card" key={id}>
            <Link to={`/homepagedata/${id}`}>
              <img src={img} alt={id} className="home-img" />
            </Link>
            <Link to={`/homepagedata/${id}`} className="open-overlay-btn">
              Learn more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
