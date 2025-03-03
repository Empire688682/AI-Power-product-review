import { NextResponse } from "next/server";
import { decodeEmail } from "../../emailDecoder/route";
import { UserModel } from "../../model/UserModel";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { ConnectDb } from "../../utils/ConnectDb";
dotenv.config();

export async function POST(req) {
  await ConnectDb;
  const formData = await req.formData();
  const token = formData.get("token");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  try {
    if (!password || !confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "All field rquired",
      });
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Password not match" },
        { status: 400 },
      );
    }
    const email = await decodeEmail(token);
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 400 },
      );
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 },
      );
    }
    const formalPassword = user.password;
    const isPwdMatch = await bcrypt.compare(password, formalPassword);
    if (isPwdMatch) {
      return NextResponse.json(
        { success: false, message: "Password already used" },
        { status: 400 },
      );
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPwd, forgettenPasswordToken: "" },
      { new: true },
    );
    return NextResponse.json(
      { success: true, message: "Password changed successful" },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error resetingPwd:", error);
    return NextResponse.json(
      { success: false, message: "Unable to reset password" },
      { status: 500 },
    );
  }
}
