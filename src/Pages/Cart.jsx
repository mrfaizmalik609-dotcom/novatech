import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="cart-empty">
        {/* Back to Shop Link for Empty Cart */}
        <div className="back-to-shop-wrapper">
          <Link to="/shop" className="back-to-shop-link">
            ← Back to Shop
          </Link>
        </div>
        
        <h1>Your Cart is Empty</h1>
        <p>Add some products from the Shop page.</p>
        <Link to="/shop" style={{ 
          display: 'inline-block', 
          marginTop: '50px', 
          padding: '10px 30px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '6px' 
        }}>
          Go to Shop
        </Link>
      </main>
    );
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleDecrement = (id, currentQty) => {
    if (currentQty > 1) updateQuantity(id, currentQty - 1);
  };

  const handleIncrement = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  return (
    <main className="cart-container">
      {/* Back to Shop Link at Top */}
      <div className="back-to-shop-wrapper">
        <Link to="/shop" className="back-to-shop-link">
          ← Back to Shop
        </Link>
      </div>
      
      <h1 className="cart-title">Your Cart</h1>

      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            {/* Image is now NOT clickable - removed Link wrapper */}
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
            />

            <div className="cart-item-details">
              <Link
                to={`/singleproduct/${item.id}`}
                className="cart-item-name-link"
              >
                <h2>{item.name}</h2>
              </Link>

              <p className="cart-price">Price: ${item.price.toFixed(2)}</p>

              <div className="quantity-controls">
                <button
                  onClick={() => handleDecrement(item.id, item.quantity)}
                  disabled={item.quantity === 1}
                  className={`qty-btn ${
                    item.quantity === 1 ? "qty-disabled" : ""
                  }`}
                >
                  -
                </button>
                <span className="qty-count">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.id, item.quantity)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <p className="item-total">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="remove-btn-wrapper">
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="grand-total">
        Grand Total: ${totalPrice.toFixed(2)}
      </h2>

      <div className="checkout-wrapper">
        <button
          onClick={() => navigate("/checkout")}
          className="checkout-btn"
        >
          Proceed to Checkout
        </button>
      </div>

      <style>
        {`
          .cart-empty {
            text-align: center;
            margin-top: 120px;
            padding: 0 16px;
            min-height: 50vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .cart-empty h1 {
            font-size: 2.5rem;
            color: #666;
            margin-bottom: 20px;
          }

          .cart-empty p {
            font-size: 1.2rem;
            color: #888;
            margin-bottom: 30px;
          }

          .cart-container {
            max-width: 900px;
            margin: 120px auto 80px auto;
            padding: 0 16px;
            font-family: 'Segoe UI', sans-serif;
            position: relative;
          }

          /* Back to Shop Link Styling */
          .back-to-shop-wrapper {
            position: absolute;
            top: -50px;
            left: 16px;
            z-index: 10;
          }

          .back-to-shop-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
            border: 2px solid transparent;
          }

          .back-to-shop-link:hover {
            background-color: #0056b3;
            text-decoration: none;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
          }

          /* For Empty Cart - Position Back Link at Top */
          .cart-empty .back-to-shop-wrapper {
            position: absolute;
            top: -50px;
            left: 16px;
            margin-bottom: 0;
            padding-top: 0;
            z-index: 10;
          }

          .cart-title {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5rem;
            color: #333;
          }

          .cart-item {
            display: flex;
            align-items: center;
            gap: 20px;
            border: 1px solid #ddd;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: box-shadow 0.3s ease;
          }

          .cart-item:hover {
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          }

          .cart-item-image {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
            flex-shrink: 0;
            /* Removed cursor: pointer and hover transform - image is no longer clickable */
          }

          .cart-item-details {
            flex: 1;
            min-width: 180px;
          }

          .cart-item-name-link {
            text-decoration: none;
            color: #007bff;
            transition: color 0.3s ease;
          }

          .cart-item-name-link:hover {
            color: #0056b3;
            text-decoration: underline;
          }

          .cart-item-name-link h2 {
            margin: 0 0 10px 0;
            font-size: 1.3rem;
          }

          .cart-price {
            font-weight: 600;
            margin: 6px 0;
            font-size: 1.1rem;
            color: #333;
          }

          .quantity-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            margin: 8px 0;
          }

          .qty-btn {
            padding: 6px 12px;
            font-size: 18px;
            background-color: #007bff;
            border: none;
            color: white;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }

          .qty-btn:hover:not(.qty-disabled) {
            background-color: #0056b3;
          }

          .qty-disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .qty-count {
            font-weight: 600;
            min-width: 30px;
            text-align: center;
            font-size: 1.1rem;
            padding: 4px 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #f8f9fa;
          }

          .item-total {
            font-weight: 700;
            margin-top: 8px;
            font-size: 1.1rem;
            color: #28a745;
          }

          .remove-btn-wrapper {
            margin-left: auto;
          }

          .remove-btn {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }

          .remove-btn:hover {
            background-color: #c82333;
          }

          .grand-total {
            text-align: right;
            margin-top: 30px;
            font-size: 1.8rem;
            color: #333;
            font-weight: 700;
          }

          .checkout-wrapper {
            text-align: right;
            margin-top: 20px;
          }

          .checkout-btn {
            background-color: #28a745;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            max-width: 300px;
            width: 100%;
            transition: background-color 0.3s ease;
          }

          .checkout-btn:hover {
            background-color: #218838;
          }

          /* 📱 Mobile & Tablet */
          @media (max-width: 768px) {
            .cart-container {
              margin: 120px auto 80px auto;
            }

            .back-to-shop-wrapper {
              position: static;
              text-align: center;
              margin-bottom: 20px;
              padding-top: 10px;
            }

            .back-to-shop-link {
              font-size: 14px;
              padding: 10px 20px;
            }

            .cart-empty .back-to-shop-wrapper {
              position: static;
              text-align: center;
              margin-bottom: 30px;
            }

            .cart-item {
              flex-direction: column;
              align-items: flex-start;
              text-align: center;
            }

            .cart-item-image {
              width: 100%;
              height: auto;
              max-width: 250px;
              margin: 0 auto;
            }

            .cart-item-details {
              width: 100%;
              text-align: center;
            }

            .quantity-controls {
              justify-content: center;
            }

            .remove-btn-wrapper {
              width: 100%;
              margin-left: 0;
              text-align: center;
            }

            .remove-btn {
              width: 100%;
              max-width: 200px;
            }

            .grand-total {
              text-align: center;
            }

            .checkout-wrapper {
              text-align: center;
            }

            .cart-title {
              font-size: 2rem;
            }
          }
        `}
      </style>
    </main>
  );
}

export default Cart;