import express from "express";
import dotenv from "dotenv";
import KidsList from "../Model/kidsModel.js";
dotenv.config();
const kidsRouter = express.Router();
//  post singl data route
kidsRouter.post("/post", async (req, res) => {
  try {
    const { brand, image, description, price, category, color } = req.body;
    const kidsProduct = new KidsList({
      brand,
      image,
      description,
      price,
      category,
      color,
    });
    await kidsProduct.save();
    res.status(201).json({ isError: true, message: "product Added succfully" });
  } catch (error) {
    res.status(500).json({ isError: true, message: message.error });
  }
});
// getAll data routes
kidsRouter.get("/getAll", async (req, res) => {
  try {
    const productItem = await KidsList.find();
    console.log(productItem);
    res.json(productItem);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// post multiple data
kidsRouter.post("/postAll", async (req, res) => {
  try {
    let kidproduct = req.body;
    await KidsList.insertMany(kidproduct);
    res.status(200).json({ message: "product added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete routes
kidsRouter.delete("/:id", async (req, res) => {
  try {
    let _id = req.params.id;

    await KidsList.findByIdAndDelete(_id);
    res.status(200).json({ message: "product deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route for filtering sorting
kidsRouter.post("/", async (req, res) => {
  try {
    let { color, brand, category, order } = req.body;
    console.log("---reqbody---", req.body);
    let filter = {};
    if (color) {
      filter.color = color;
    }
    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    let sorting = {};
    if (order === "desc") {
      sorting.price = -1;
    } else {
      sorting.price = 1;
    }
    const kidItem = await KidsList.find(filter).sort(sorting);
    console.log(kidItem);
    res.json(kidItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default kidsRouter;
