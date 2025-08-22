import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="cart-empty">
        <h1>Your Cart is Empty</h1>
        <p>Add some products from the Shop page.</p>
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
      <h1 className="cart-title">Your Cart</h1>

      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <Link to={`/singleproduct/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
            </Link>

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
            margin-top: 80px;
            padding: 0 16px;
          }

          .cart-container {
            max-width: 900px;
            margin: 80px auto;
            padding: 0 16px;
            font-family: 'Segoe UI', sans-serif;
          }

          .cart-title {
            text-align: center;
            margin-bottom: 30px;
          }

          .cart-item {
            display: flex;
            align-items: center;
            gap: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }

          .cart-item-image {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
            flex-shrink: 0;
          }

          .cart-item-details {
            flex: 1;
            min-width: 180px;
          }

          .cart-item-name-link {
            text-decoration: none;
            color: black;
          }

          .cart-price {
            font-weight: 600;
            margin: 6px 0;
          }

          .quantity-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            margin: 8px 0;
          }

          .qty-btn {
            padding: 4px 10px;
            font-size: 18px;
            background-color: #007bff;
            border: none;
            color: white;
            border-radius: 4px;
            cursor: pointer;
          }

          .qty-disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .qty-count {
            font-weight: 600;
            min-width: 24px;
            text-align: center;
          }

          .item-total {
            font-weight: 700;
            margin-top: 5px;
          }

          .remove-btn-wrapper {
            margin-left: auto;
          }

          .remove-btn {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
          }

          .grand-total {
            text-align: right;
            margin-top: 20px;
          }

          .checkout-wrapper {
            text-align: right;
            margin-top: 20px;
          }

          .checkout-btn {
            background-color: #28a745;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            max-width: 250px;
            width: 100%;
          }

          /* 📱 Mobile & Tablet */
          @media (max-width: 768px) {
            .cart-item {
              flex-direction: column;
              align-items: flex-start;
            }

            .cart-item-image {
              width: 100%;
              height: auto;
              max-width: 250px;
            }

            .remove-btn-wrapper {
              width: 100%;
              margin-left: 0;
            }

            .remove-btn {
              width: 100%;
            }

            .grand-total {
              text-align: center;
            }

            .checkout-wrapper {
              text-align: center;
            }
          }
        `}
      </style>
    </main>
  );
}

export default Cart;
