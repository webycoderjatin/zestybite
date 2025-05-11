const Razorpay = require("razorpay");
const crypto = require("crypto");
const express = require("express");
const Payment = express.Router();
const Order = require("../models/Orders")

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


Payment.post("/save-order", async (req, res) => {
  const {
    userId,
    items,
    totalAmount,
    paymentStatus,
    paymentMethod,
    orderStatus,
    address,
    orderedAt,
    deliveredAt,
    paymentId,
  } = req.body;

  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentStatus,
      paymentMethod,
      orderStatus,
      address,
      orderedAt,
      deliveredAt,
      paymentId,
    });

    await newOrder.save();
    res.status(200).json({ success: true, message: "Order saved" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order saving failed", error: err });
  }
});


Payment.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const key_secret = razorpay.key_secret;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Payment verified ✅
    // Save order as paid in DB
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false });
  }
});

module.exports = Payment;
