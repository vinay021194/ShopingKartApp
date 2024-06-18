import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import "./HomePage.css";
import { CartContext } from "../../context/CardContext";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Context to access the addToCart function from CartContext
  const { addToCart } = useContext(CartContext);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <div className="rating">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className="star"
                  color={
                    index < Math.round(product.rating.rate) ? "gold" : "#ccc"
                  }
                />
              ))}
              <span>({product.rating.count})</span>
            </div>
          </Link>
          <button onClick={() => addToCart(product)}>
            <FaCartShopping className="cart-icon" />
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
