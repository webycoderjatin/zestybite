import React, { useState } from "react";
import axios from "axios";
import "../src/App.css";
import { MdFastfood } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  getProduct();

  return (
    <div className="products-grid">
      {products.map((product, index) => {
        return (
          <div className="card" key={index}>
            <img src={product.imageURL} height={200} width="100%" className="image-justify"/>
            <h3>{product.name}</h3>
            <p className="desc-product light">{product.description}</p>
            <b><p>₹ {product.price}</p></b>
            <button className="order-btn"><span>Order Now</span> <MdFastfood className="icon-s"/></button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
