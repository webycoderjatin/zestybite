import React, { useState } from "react";
import axios from "axios";
import { MdFastfood } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrder = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue");
      navigate("/login"); // Redirect to login page
      return;
    }

    try {
      await axios.get(`http://localhost:5000/admin/order/${id}`);
      console.log("Succesfull transfered order");
    } catch (err) {
      console.log(err);
    }
    navigate(`/order/${id}`);
  };

  getProduct();

  return (
    <div className="products-grid">
      {products.map((product, index) => {
        return (
          <div className="card" key={index}>
            <img
              src={product.imageURL}
              height={200}
              width="100%"
              className="image-justify"
            />
            <h3>{product.name}</h3>
            <p className="desc-product light">{product.description}</p>
            <b>
              <p>₹ {product.price}</p>
            </b>
            <button
              className="order-btn"
              onClick={() => handleOrder(product._id)}
            >
              <span>Order Now</span> <MdFastfood className="icon-s" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
