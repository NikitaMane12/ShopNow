import express from "express";
import dotenv from "dotenv";
import productModel from "../Model/productModel.js";
dotenv.config();
const productRouter = express.Router();
productRouter.post("/post", async (req, res) => {
  try {
    const { title, image, description, price, category } = req.body;
    const product = new productModel({
      title,
      image,
      description,
      price,
      category,
      color,
    });
    await product.save();
    res.status(201).json({ meassge: "product is added succssfully" });
  } catch (error) {
    res.status(500).json({ meassge: "error adding to product" });
  }
});
// ----simple get route------------
productRouter.get("/getAll", async (req, res) => {
  try {
    const productItem = await productModel.find();
    console.log(productItem);
    res.json(productItem);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

//  route with the filter and sorting

productRouter.post("/", async (req, res) => {
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
      sorting.price = -1; // Sort by price in descending order
    } else {
      sorting.price = 1; // Default to ascending order
    }

    const productItem = await productModel.find(filter).sort(sorting);
    console.log(productItem);
    res.json(productItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete product
productRouter.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const productdeleteItem = await productModel.findOneAndDelete({
      _id: productId,
    });

    if (!productdeleteItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log(productdeleteItem);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

productRouter.put("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const updateproductItem = await productModel.findByIdAndUpdate(
      productId,
      req.body
    );
    if (!updateproductItem) {
      res.status(404).json({ meassge: "data is not found" });
    }
    res.status(400).json({ meassge: "data is updated successfully" });
  } catch (error) {
    res.status(500).json;
  }
});

// add multiple productdata
productRouter.post("/multipleData", async (req, res) => {
  try {
    const products = req.body; // Expecting an array of products

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    await productModel.insertMany(products);

    res.status(201).json({ message: "Products added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding products", error: error.message });
  }
});
export default productRouter;
