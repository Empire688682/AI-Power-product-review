import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

export const decodeEmail = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const email = decodedToken.email;
    return email;
  } catch (error) {
    console.log("DECODING ERROR:", error);
  }
};
