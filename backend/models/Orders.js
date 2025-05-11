const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image : String,
    }
  ],
  totalAmount: Number,
  paymentStatus: String,
  paymentMethod: String,
  orderStatus: String,
  address: Object,
  orderedAt: Date,
  deliveredAt: Date
});

module.exports = mongoose.model("Order", orderSchema);