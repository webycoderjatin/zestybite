import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import cookie library

const Order = () => {
  const [name, setName] = useState("");
  const [phnNum, setPhnNum] = useState("");
  const [address, setAddress] = useState("");
  const [specInst, setSpecInst] = useState("");
  const [quant, setQuant] = useState(1);
  const [finalPrice, setFinalPrice] = useState();
  const [productData, setProductData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // For navigation if not logged in

  const productId = location.pathname.split("/").filter(Boolean).pop();

  // Check if the user is logged in by verifying the token in cookies
  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve the token from cookies
    if (!token) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const getProductData = async () => {
    try {
      const p_data = await axios.get(
        `http://localhost:5000/order/${productId}`
      );
      setProductData(p_data.data);
      console.log(p_data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (productData.price) {
      setFinalPrice(productData.price * quant);
    }
  }, [quant, productData]);

  const makePayment = async (e) => {
    e.preventDefault();

    try {
      // Create order on backend
      const { data: order } = await axios.post(
        "http://localhost:5000/pay/create-order",
        {
          amount: finalPrice,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ZestyBites",
        description: "Order Payment",
        order_id: order.id,
        handler: function (response) {
          alert("Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: name,
          email: "jotinrai106@gmail.com",
          contact: phnNum,
        },
        notes: {
          address: address,
        },
        theme: {
          color: "#ff5200",
          hide_topbar: true,
          custom_background: "#f4f4f4",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="order-page-cont">
      <div>
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>

        <form className="form-cont">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="phn-num">Phone Number</label>
          <input
            type="number"
            name="phn-num"
            value={phnNum}
            onChange={(e) => setPhnNum(e.target.value)}
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="pay-meth">Payment Method</label>
          <select name="pay-meth">
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>

          <label htmlFor="spec-inst">Special Instructions</label>
          <textarea
            name="spec-inst"
            value={specInst}
            onChange={(e) => setSpecInst(e.target.value)}
          ></textarea>

          <button onClick={makePayment}>Place an Order</button>
        </form>
      </div>

      <div className="order-info">
        <img
          src={productData.imageURL}
          alt={productData.name}
          height={200}
          width={250}
        />
        <h3>{productData.name}</h3>
        <p>{productData.description}</p>
        <div className="quant-cont">
          <label htmlFor="quant">Quantity</label>
          <select
            name="quant-option"
            value={quant}
            onChange={(e) => setQuant(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="border-line"></div>
        <h4>
          Total : ₹{" "}
          <span>{productData?.price ? productData.price * quant : 0}</span>
        </h4>
      </div>
    </div>
  );
};

export default Order;
