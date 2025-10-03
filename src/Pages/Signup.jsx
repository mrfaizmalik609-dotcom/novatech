import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // ✅ apni firebase.jsx ka import
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // ✅ Firebase signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      setError("");
      alert("Signup successful 🎉");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <main className="signup-main">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="signup-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />

          <label htmlFor="password" className="signup-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />

          <label htmlFor="confirm-password" className="signup-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-input"
            required
          />

          {error && <div className="signup-error">{error}</div>}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Log in
          </Link>
        </p>
      </div>

      {/* ✅ Stylish CSS */}
      <style>{`
        .signup-main {
          min-height: 100vh;
          background: linear-gradient(135deg, #2c3e50, #4ca1af);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 120px 20px 40px;
          box-sizing: border-box;
        }
        .signup-card {
          background-color: #1a222f;
          padding: 50px 40px;
          border-radius: 15px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.7);
          width: 100%;
          max-width: 480px;
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-sizing: border-box;
        }
        .signup-title {
          text-align: center;
          margin-bottom: 40px;
          font-weight: 900;
          font-size: 2.4rem;
          color: #4caf50;
          text-shadow: 0 0 12px #4caf50;
          user-select: none;
        }
        .signup-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.03em;
        }
        .signup-input {
          width: 100%;
          padding: 14px 18px;
          margin-bottom: 20px;
          border-radius: 8px;
          border: 1.5px solid #3a4551;
          background-color: #2d3748;
          color: #eee;
          font-size: 16px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
          box-sizing: border-box;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .signup-input:focus {
          border-color: #4caf50;
          box-shadow: 0 0 8px #4caf50;
          outline: none;
        }
        .signup-error {
          color: #ff6b6b;
          font-weight: 600;
          margin-bottom: 18px;
          font-size: 14px;
          letter-spacing: 0.02em;
        }
        .signup-btn {
          width: 100%;
          padding: 16px 0;
          background-color: #4caf50;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.7);
          user-select: none;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .signup-btn:hover {
          background-color: #3e8e41;
          box-shadow: 0 8px 24px rgba(62, 142, 65, 0.8);
        }
        .signup-footer {
          margin-top: 30px;
          font-size: 14px;
          color: #a0b4a0;
          text-align: center;
          user-select: none;
        }
        .signup-link {
          color: #4caf50;
          text-decoration: none;
          font-weight: 600;
          user-select: none;
          transition: text-decoration 0.3s ease;
        }
        .signup-link:hover {
          text-decoration: underline;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .signup-card {
            padding: 40px 30px;
            max-width: 400px;
          }
          .signup-title {
            font-size: 2rem;
            margin-bottom: 30px;
          }
          .signup-input {
            font-size: 15px;
            padding: 13px 16px;
          }
          .signup-btn {
            font-size: 18px;
            padding: 15px 0;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .signup-main {
            padding: 80px 15px 30px;
            align-items: center;
          }
          .signup-card {
            padding: 25px 20px;
            border-radius: 12px;
            max-width: 100%;
          }
          .signup-title {
            font-size: 1.6rem;
            margin-bottom: 25px;
          }
          .signup-input {
            font-size: 14px;
            padding: 12px 14px;
            margin-bottom: 16px;
          }
          .signup-btn {
            font-size: 16px;
            padding: 14px 0;
          }
        }
      `}</style>
    </main>
  );
}

export default Signup;
