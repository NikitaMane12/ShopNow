import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerDetails: {
    firstname: { type: String },
    lastname: { type: String },
    address: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
      image: { type: String },
    },
  ],
  totalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
});

const OrderModel = mongoose.model("orderData", orderSchema);

export default OrderModel;
