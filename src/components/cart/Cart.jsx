import React, { useContext } from "react";
import "./Cart.css";
import { FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../../context/CardContext";

const Cart = () => {
  // Get cart state and actions from CartContext
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useContext(CartContext);

  // Handle quantity change for an item in the cart
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      // Update quantity if it's a valid number
      updateQuantity(id, quantity);
    }
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="item-details">
                <h2>{item.title}</h2>
                <p>${item.price}</p>
                <div className="quantity">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                  />
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrashAlt /> Remove
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h2>Total: ${getTotalPrice()}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
