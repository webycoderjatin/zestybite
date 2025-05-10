const Razorpay = require("razorpay");
const express = require("express");
const Payment = express.Router();

const dotenv = require("dotenv")

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

Payment.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // amount in paise
    currency: "INR",
    receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});

module.exports = Payment;
