import express from "express";
import dotenv from "dotenv";
import OrderModel from "../Model/orderModel.js";
import mongoose from "mongoose";

dotenv.config();

const orderRoute = express.Router();

// POST request to create a new order
orderRoute.post("/", async (req, res) => {
  try {
    const { userId, customerDetails, cartItems, totalAmount } = req.body;
    console.log("----req.body----", req.body);

    // Validate request data
    if (!userId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Invalid order details" });
    }

    // Create new order
    const newOrder = new OrderModel({
      userId,
      customerDetails,
      cartItems,
      totalAmount,
      createdAt: new Date(),
    });

    // Save to database
    await newOrder.save();

    res.status(201).json({ newOrder, message: "Order Placed Successfully" }); // ✅ Fixed: Return newOrder instead of savedOrder
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET request to fetch all orders
orderRoute.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE request to delete an order
orderRoute.delete("/orders/:id", async (req, res) => {
  try {
    const orderID = req.params.id;
    console.log("----orderId---", orderID);

    // Validate if orderID is provided
    if (!orderID) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Validate if orderID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderID)) {
      return res.status(400).json({ message: "Invalid Order ID format" });
    }

    const deletedOrder = await OrderModel.findByIdAndDelete(orderID);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default orderRoute;
