import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Make sure this path is correct
import { useAuth } from "../context/AuthContext"; // Import useAuth

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get the ID token
      const token = await user.getIdToken();
      
      // Call the login function from AuthContext
      login(token, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        firstName: user.displayName ? user.displayName.split(' ')[0] : email.split('@')[0]
      });
      
      setError("");
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert Firebase error codes to user-friendly messages
  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      default:
        return 'An error occurred during login. Please try again.';
    }
  };

  return (
    <main className="login-main">
      <div className="login-container">
        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="login-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          {error && <div className="login-error">{error}</div>}

          <div className="login-forgot">
            <Link to="/forgetpassword" className="login-forgot-link">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="login-signup">
            Sign up
          </Link>
        </p>
      </div>

      <style>{`
        .login-main {
          min-height: 80vh;
          background: linear-gradient(135deg, #2c3e50, #4ca1af);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 120px 20px 50px;
          box-sizing: border-box;
        }

        .login-container {
          background-color: #1a222f;
          padding: 50px 40px;
          border-radius: 15px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.7);
          width: 100%;
          max-width: 550px;
          color: #fff;
          font-family: 'Segoe UI', sans-serif;
        }

        .login-title {
          text-align: center;
          margin-bottom: 40px;
          font-weight: 900;
          font-size: 2.8rem;
          color: #4caf50;
          text-shadow: 0 0 12px #4caf50;
        }

        .login-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 14px;
        }

        .login-input {
          width: 100%;
          padding: 14px 18px;
          margin-bottom: 24px;
          border-radius: 8px;
          border: 1.5px solid #3a4551;
          background-color: #2d3748;
          color: #eee;
          font-size: 16px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .login-input:focus {
          border-color: #4caf50;
          box-shadow: 0 0 8px #4caf50;
          outline: none;
        }

        .login-error {
          color: #ff6b6b;
          font-weight: 600;
          margin-bottom: 18px;
          font-size: 14px;
        }

        .login-forgot {
          margin-bottom: 12px;
          text-align: right;
        }

        .login-forgot-link {
          color: #ff6b6b;
          text-decoration: none;
          font-weight: 600;
        }
        .login-forgot-link:hover {
          text-decoration: underline;
        }

        .login-btn {
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
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .login-btn:hover {
          background-color: #3e8e41;
          box-shadow: 0 8px 24px rgba(62, 142, 65, 0.8);
        }
        .login-btn:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
          box-shadow: none;
        }

        .login-footer {
          margin-top: 30px;
          font-size: 14px;
          color: #a0b4a0;
          text-align: center;
        }

        .login-signup {
          color: #4caf50;
          text-decoration: none;
          font-weight: 600;
        }
        .login-signup:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 30px 20px;
          }
          .login-title {
            font-size: 2rem;
            margin-bottom: 25px;
          }
          .login-btn {
            font-size: 18px;
            padding: 14px 0;
          }
          .login-forgot {
            text-align: center;
          }
        }
      `}</style>
    </main>
  );
}

export default Login;