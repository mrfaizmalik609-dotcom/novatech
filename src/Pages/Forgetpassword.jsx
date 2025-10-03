import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"; // apni firebase.jsx ka sahi path

function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      setMessage("");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Please check your email.");
      setError("");
    } catch (err) {
      console.error("Password Reset Error:", err.message);
      setError("Failed to send reset email. Please check the email entered.");
      setMessage("");
    }
  };

  return (
    <main className="forget-main">
      <div className="forget-card">
        <h2 className="forget-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="forget-label">
            Enter your email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forget-input"
            required
          />
          {error && <div className="forget-error">{error}</div>}
          {message && <div className="forget-message">{message}</div>}
          <button type="submit" className="forget-btn">
            Reset Password
          </button>
        </form>
        <p className="forget-footer">
          Remembered your password?{" "}
          <Link to="/login" className="forget-link">
            Log in
          </Link>
        </p>
      </div>

      {/* ✅ CSS same as before */}
      <style>{`
        .forget-main {
          min-height: 100vh;
          background: linear-gradient(135deg, #2c3e50, #4ca1af);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }
        .forget-card {
          background-color: #1a222f;
          padding: 40px 30px;
          border-radius: 15px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.7);
          width: 100%;
          max-width: 480px;
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          letter-spacing: 0.02em;
          box-sizing: border-box;
        }
        .forget-title { text-align: center; margin-bottom: 40px; font-weight: 900; font-size: 2.4rem; color: #4caf50; text-shadow: 0 0 12px #4caf50; }
        .forget-label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px; }
        .forget-input { width: 100%; padding: 14px 18px; margin-bottom: 24px; border-radius: 8px; border: 1.5px solid #3a4551; background-color: #2d3748; color: #eee; font-size: 16px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3); box-sizing: border-box; transition: border-color 0.3s, box-shadow 0.3s; }
        .forget-input:focus { border-color: #4caf50; box-shadow: 0 0 8px #4caf50; outline: none; }
        .forget-error { color: #ff6b6b; font-weight: 600; margin-bottom: 18px; font-size: 14px; }
        .forget-message { color: #81c784; font-weight: 600; margin-bottom: 18px; font-size: 14px; }
        .forget-btn { width: 100%; padding: 16px 0; background-color: #4caf50; border: none; border-radius: 10px; color: #fff; font-size: 20px; font-weight: 700; cursor: pointer; box-shadow: 0 6px 20px rgba(76, 175, 80, 0.7); transition: background-color 0.3s ease, box-shadow 0.3s ease; }
        .forget-btn:hover { background-color: #3e8e41; box-shadow: 0 8px 24px rgba(62, 142, 65, 0.8); }
        .forget-footer { margin-top: 30px; font-size: 14px; color: #a0b4a0; text-align: center; }
        .forget-link { color: #4caf50; text-decoration: none; font-weight: 600; }
        .forget-link:hover { text-decoration: underline; }

        @media (max-width: 480px) {
          .forget-main { padding: 40px 15px; }
          .forget-card { padding: 20px 15px; max-width: 100%; border-radius: 12px; }
          .forget-title { font-size: 1.6rem; margin-bottom: 25px; }
          .forget-input { font-size: 14px; padding: 12px 14px; margin-bottom: 20px; }
          .forget-btn { font-size: 16px; padding: 14px 0; }
        }
      `}</style>
    </main>
  );
}

export default Forgetpassword;
