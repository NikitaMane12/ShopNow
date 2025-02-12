import mongoose from "mongoose";

const product = new mongoose.Schema({
  brand: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
});

const productModel = mongoose.model("ProductModel", product);
export default productModel;
