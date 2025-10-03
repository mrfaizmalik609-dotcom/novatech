import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import useAuth

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, cartMessage, showCartMessage, setShowCartMessage } =
    useContext(CartContext);
  const { isLoggedIn, logout, user } = useAuth(); // Get auth state and functions

  const [showSearch, setShowSearch] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const closeCollapse = () => setIsCollapsed(true);

  const handleLogout = () => {
    logout();
    closeCollapse();
    navigate("/");
  };

  return (
    <>
      <style>{`
        /* Navbar base */
        nav.navbar {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #0a2342 !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          padding: 1rem 1.5rem;
          z-index: 1050;
        }

        /* Brand styling */
        .navbar-brand {
          font-size: 1.8rem;
          font-weight: 900;
          color: #FFD700 !important;
          user-select: none;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
          line-height: 1.5;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .navbar-brand:hover {
          color: #ffea00 !important;
          text-shadow: 0 0 8px #ffea00;
        }

        /* Nav links container */
        .navbar-nav {
          gap: 2rem;
          font-weight: 600;
          font-size: 1.05rem;
        }

        /* Nav links */
        .nav-link {
          color: #eee !important;
          position: relative;
          padding: 0.75rem 0.75rem;
          transition: color 0.3s ease;
          line-height: 1.6;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #FFD700 !important;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 3px;
          background: #FFD700;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 60%;
          background: #ffea00;
        }

        /* Search & icons container */
        .icon-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
        }

        /* Search button */
        .search-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          filter: invert(90%) sepia(10%) saturate(700%) hue-rotate(185deg);
          transition: filter 0.3s ease;
        }
        .search-btn:hover {
          filter: invert(70%) sepia(50%) saturate(1200%) hue-rotate(190deg);
        }

        /* Search input */
        .search-input {
          margin-left: 0.4rem;
          width: 180px;
          max-width: 60vw;
          padding: 7px 14px;
          font-size: 0.95rem;
          border-radius: 6px;
          border: 1.5px solid #555;
          background-color: #122b4c;
          color: #fff;
          outline: none;
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
          transition: width 0.3s ease;
        }
        .search-input::placeholder {
          color: #ccc;
          font-style: italic;
        }
        .search-input:focus {
          border-color: #FFD700;
          box-shadow: 0 0 12px #FFD700;
        }

        /* Cart & Login icons */
        .icon-link {
          position: relative;
          display: inline-block;
          cursor: pointer;
          filter: invert(90%) sepia(10%) saturate(700%) hue-rotate(185deg);
          transition: filter 0.3s ease;
          width: 26px;
          height: 26px;
        }
        .icon-link:hover {
          filter: invert(70%) sepia(50%) saturate(1200%) hue-rotate(190deg);
        }

        /* Logout button */
        .logout-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          filter: invert(90%) sepia(10%) saturate(700%) hue-rotate(185deg);
          transition: filter 0.3s ease;
          width: 26px;
          height: 26px;
          padding: 0;
        }
        .logout-btn:hover {
          filter: invert(70%) sepia(50%) saturate(1200%) hue-rotate(190deg);
        }

        /* User welcome message */
        .user-welcome {
          color: #FFD700;
          font-weight: 600;
          margin-right: 0.5rem;
          display: none;
        }

        /* Cart badge */
        .cart-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #e74c3c;
          color: white;
          border-radius: 50%;
          padding: 2px 7px;
          font-size: 12px;
          font-weight: 700;
          user-select: none;
          box-shadow: 0 0 6px rgba(231, 76, 60, 0.8);
        }

        /* Cart message popup */
        .cart-message {
          position: absolute;
          top: 36px;
          right: 0;
          background-color: #122b4c;
          color: #ffd700;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          white-space: nowrap;
          z-index: 1100;
          user-select: none;
          cursor: pointer;
          box-shadow: 0 0 12px #ffd700;
          transition: opacity 0.3s ease;
        }

        /* Navbar toggler */
        .navbar-toggler {
          border: none;
          outline: none;
          filter: invert(90%) sepia(10%) saturate(700%) hue-rotate(185deg);
          transition: filter 0.3s ease;
        }
        .navbar-toggler:hover {
          filter: invert(70%) sepia(50%) saturate(1200%) hue-rotate(190deg);
        }

        /* Responsive adjustments */
        @media (min-width: 992px) {
          .user-welcome {
            display: block;
          }
        }
        
        @media (max-width: 991px) {
          .navbar-nav {
            gap: 1rem;
            font-size: 1rem;
          }
          .search-input {
            width: 130px;
          }
          .user-welcome {
            display: none;
          }
        }
        @media (max-width: 575px) {
          .search-input {
            width: 100px;
            font-size: 0.85rem;
          }
          .icon-link, .logout-btn {
            width: 22px;
            height: 22px;
          }
        }
      `}</style>

      <nav className="navbar navbar-expand-lg fixed-top shadow">
        <div className="container-fluid">
          {/* Brand */}
          <Link to="/" className="navbar-brand" onClick={closeCollapse}>
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="14" width="44" height="28" rx="5" ry="5" fill="#6C63FF" stroke="#3F3D56" strokeWidth="2"/>
              <rect x="2" y="44" width="60" height="6" rx="3" ry="3" fill="#3F3D56"/>
              <line x1="14" y1="40" x2="50" y2="40" stroke="#9FA8DA" strokeWidth="2" strokeLinecap="round"/>
              <line x1="14" y1="36" x2="50" y2="36" stroke="#9FA8DA" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 18 L26 24 L18 30" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.4"/>
            </svg>
            𝚃𝚎𝚌𝚑𝙽𝚘𝚟𝚊
          </Link>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div
            className={`collapse navbar-collapse${isCollapsed ? "" : " show"}`}
            id="navbarNav"
          >
            {/* Nav Links */}
            <ul className="navbar-nav mx-auto">
              {["/", "/shop", "/about", "/contact"].map((path, idx) => {
                const labels = ["Home", "Shop", "About", "Contact"];
                const active = isActive(path);
                return (
                  <li key={path} className="nav-item">
                    <Link
                      to={path}
                      className={`nav-link${active ? " active" : ""}`}
                      onClick={closeCollapse}
                      aria-current={active ? "page" : undefined}
                    >
                      {labels[idx]}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Icons */}
            <div className="icon-group" ref={searchRef}>
              {/* User welcome message (visible on desktop) */}
              {isLoggedIn && (
                <span className="user-welcome">Hello, {user?.firstName || 'User'}</span>
              )}
              
              {/* Search Button */}
              <button
                type="button"
                className="search-btn"
                aria-label="Toggle Search"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                  alt="Search"
                  width="24"
                  height="24"
                />
              </button>

              {/* Search Input */}
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="search-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      alert(`Searching for: ${e.target.value}`);
                      setShowSearch(false);
                    }
                  }}
                />
              )}

              {/* Cart */}
              <Link to="/cart" aria-label="Cart" className="icon-link" title="Cart">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                  alt="Cart"
                  width="24"
                  height="24"
                />
                {cartItems.length > 0 && (
                  <span className="cart-badge">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
                {showCartMessage && (
                  <div
                    className="cart-message"
                    onClick={() => setShowCartMessage(false)}
                    title="Dismiss"
                  >
                    {cartMessage}
                  </div>
                )}
              </Link>

              {/* Login/Logout */}
              {isLoggedIn ? (
                <button
                  className="logout-btn"
                  aria-label="Logout"
                  title="Logout"
                  onClick={handleLogout}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/126/126467.png"
                    alt="Logout"
                    width="24"
                    height="24"
                  />
                </button>
              ) : (
                <Link to="/login" aria-label="Login" className="icon-link" title="Login">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                    alt="Login"
                    width="24"
                    height="24"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;