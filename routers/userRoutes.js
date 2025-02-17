import express from "express";
import dotenv from "dotenv";
import userModel from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  let users = await userModel.find();
  console.log("users-->", users);
  res.send(users);
});
userRouter.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(201)
        .json({ isError: true, meassge: "email is already exits" });
    }
    let hashpasword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({
      firstname,
      lastname,
      email,
      password: hashpasword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ isError: false, meassge: "user register successfully" });
  } catch (error) {
    return res.status(400).json({ isError: true, meassge: error.meassge });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log("user--->", user);
    if (!user) {
      return res
        .status(201)
        .json({ isError: true, meassge: "please resgister first" });
    }
    let passcheck = bcrypt.compareSync(password, user.password);
    if (passcheck) {
      return res
        .status(202)
        .json({ isError: true, meassge: "Invalid creditals" });
    }
    let payLoad = { userId: user._id, username: user.firstname };
    let token = jwt.sign(payLoad, process.env.secreteKey, { expiresIn: "8h" });
    console.log("....token");
    return res.status(200).json({
      isError: false,
      meassge: "login successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(400).json({ isError: true, meassge: meassge.error });
  }
});

export default userRouter;
