import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import ProductDetails from "./components/productDetails/ProductDetails";
import Cart from "./components/cart/Cart";
import { CartProvider } from "./context/CardContext";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
