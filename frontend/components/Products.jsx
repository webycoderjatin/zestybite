import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdFastfood } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import getUserInfoFromId from "../getUserInfoFromId";

const baseURL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/products`);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${baseURL}/check-auth`, {
        withCredentials: true,
      });
      const userData = await getUserInfoFromId(response.data.user.id);
      return true
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("Not authorized");
        navigate("/login");
      } else {
        console.log(err);
      }
      return false;
    }
  };

  const handleOrder = async (id) => {
    const isAuth = await checkAuth();
    if (!isAuth) return;

    try {
      await axios.get(`${baseURL}/order/${id}`);
      console.log("Successfully transferred order");
      navigate(`/order/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="products-grid">
      {products.map((product, index) => (
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
          <button className="order-btn" onClick={() => handleOrder(product._id)}>
            <span>Order Now</span> <MdFastfood className="icon-s" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
