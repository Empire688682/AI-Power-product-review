import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const ConnectDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Db already connected");
      return;
    }
    const response = await mongoose.connect(process.env.MONGODB_URI);
    if (response) {
      console.log("Db connected successfully");
    }
    console.log("Db connected");
  } catch (error) {
    console.error("DB Error:", error);
  }
};
