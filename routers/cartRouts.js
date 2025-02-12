import express from "express";
import dotenv from "dotenv";
import CartItem from "../Model/cartModel.js";
const cartRoutes = express.Router();
dotenv.config();

// add to cart route
cartRoutes.post("/post", async (req, res) => {
  try {
    const {
      productId,
      productName,
      productImage,
      price,
      quantity,
      userId,
      description,
    } = req.body;
    // if data is already there the n fin d
    let data = await CartItem.find({ productId: productId });
    console.log("finddata->dat", data);
    if (data && data.length > 0) {
      return res.status(201).json({
        isError: true,
        messge: "The product already exist in the cart!",
      });
    }
    const cartItem = new CartItem({
      productId,
      productName,
      productImage,
      price,
      quantity,
      userId,
      description,
    });
    await cartItem.save();
    res.status(201).json({
      isError: false,
      messge: "The product has been added to your cart!",
    });
  } catch (error) {
    console.log("----error---", error);
    res.status(500).json({ isError: true, messge: error.messge });
  }
});

// cartRoutes.get("/", async (req, res) => {
//   const cartItem = await CartItem.find();
//   console.log("---cart----", cartItem);
//   res.json(cartItem);
// });

// delete route for remove from card details/cart page page
cartRoutes.delete("/delete/:id", async (req, res) => {
  try {
    let productId = req.params.id;
    console.log("req.params-->", productId);
    let cardItem = await CartItem.findOneAndDelete({ productId: productId });
    res
      .status(200)
      .json({ isError: false, message: "product removed from the cart" });
  } catch (error) {
    res.status(500).json({ isError: true, message: error.message });
  }
});

//  get specific userid
cartRoutes.get("/get/:id", async (req, res) => {
  try {
    let { userId } = req.params;
    // console.log(" req.params--->", req.params);
    let data = await CartItem.find(userId);

    res.status(200).json({ isError: false, message: "data find", data: data });
  } catch (error) {
    res.status(500).json({ isError: true, message: error.message });
  }
});
// get by productId
cartRoutes.get("/getSpecificProduct/:productId", async (req, res) => {
  try {
    let { productId } = req.params;
    console.log("productId--->", productId);
    console.log(" req.params--->", req.params);
    let data = await CartItem.find({ productId: productId });

    res.status(200).json({ isError: false, message: "data find", data: data });
  } catch (error) {
    res.status(500).json({ isError: true, message: error.message });
  }
});

//  get specific userid
cartRoutes.delete("/deletemany/:userId", async (req, res) => {
  try {
    let { userId } = req.params;

    // Delete multiple cart items where userId matches
    let result = await CartItem.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ isError: true, message: "No items found for this user" });
    }

    res.status(200).json({
      isError: false,
      message: "Cart items deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ isError: true, message: error.message });
  }
});

export default cartRoutes;
