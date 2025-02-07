import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  data: { type: Object, default: "" },
  image: { type: String, default: "" },
}, {minimize: false});

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
