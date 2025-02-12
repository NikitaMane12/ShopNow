import express from "express";
import dotenv from "dotenv";
import WomensList from "../Model/womenModel.js";

const womensRoute = express.Router();
dotenv.config();

womensRoute.post("/multipleData", async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    await WomensList.insertMany(products);

    res.status(201).json({ message: "Products added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding products", error: error.message });
  }
});
// get all data
womensRoute.get("/getAll", async (req, res) => {
  try {
    const productItem = await WomensList.find();
    console.log(productItem);
    res.json(productItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get route with the filter and sorting and pagination

womensRoute.post("/", async (req, res) => {
  try {
    let { color, category, brand, order } = req.body;

    console.log(" req.body--->", req.body);
    let filter = {};
    if (color) {
      filter.color = color;
    }
    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }
    let sorting = {};

    if (order === "desc") {
      sorting.price = -1;
    } else {
      sorting.price = 1;
    }
    console.log("filter-->", filter);
    const productItem = await WomensList.find(filter).sort(sorting);
    console.log("productItem----", productItem);
    res.json(productItem);
  } catch (error) {
    console.log(" error.message-->", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default womensRoute;
