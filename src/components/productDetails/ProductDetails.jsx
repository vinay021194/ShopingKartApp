import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../loading/Loading";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { CartContext } from "../../context/CardContext";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />
      <div className="details">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <div className="rating">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className="star"
              color={index < Math.round(product.rating.rate) ? "gold" : "#ccc"}
            />
          ))}
          <span>({product.rating.count})</span>
        </div>
        <p className="description">{product.description}</p>
        <p className="category">Category: {product.category}</p>
        <button onClick={() => addToCart(product)}>
          <FaCartShopping className="cart-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
