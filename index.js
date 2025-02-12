import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./confilg/db.js";
import userRouter from "./routers/userRoutes.js";

import productRouter from "./routers/productRoutes.js";
import womensRoute from "./routers/WomensRoutes.js";
import kidsRouter from "./routers/kidsRoute.js";
import cartRoutes from "./routers/cartRouts.js";
import orderRoute from "./routers/oredrRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  console.log("hello my home page");
});
app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/womensproduct", womensRoute);
app.use("/kidproduct", kidsRouter);
app.use("/order", orderRoute);
app.use("/cartRoutes", cartRoutes);
app.listen(process.env.PORT, async () => {
  try {
    await connect;
    console.log("server is running port 5002");
    console.log("databse is conneted");
  } catch (error) {
    console.log("error--------------- ", error);
    console.log("erorr is ");
  }
});
