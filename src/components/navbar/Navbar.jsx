import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { CartContext } from "../../context/CardContext";
import "../navbar/Navbar";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="cart-icon-container">
        <FaHome className="cart-icon" />
        ShoppingKart
      </Link>
      <Link to="/cart" className="cart-icon-container">
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        <FaCartShopping className="cart-icon" />
        Cart
      </Link>
    </nav>
  );
};

export default Navbar;
