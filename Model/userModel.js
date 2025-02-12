import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

const userModel = mongoose.model("Users", userSchema);
export default userModel;
