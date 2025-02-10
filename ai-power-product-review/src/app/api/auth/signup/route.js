import { NextResponse } from "next/server";
import { UserModel } from "../../model/UserModel";
import { ConnectDb } from "../../utils/ConnectDb";
import validator from "validator";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../sendVerificationEmail/route";
dotenv.config();

const createUser = async (req) => {
  const reqBody = await req.json();
  try {
    await ConnectDb();
    const { username, email, password, confirmPassword } = reqBody;
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "All field required" },
        { status: 400 },
      );
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { success: false, message: "Email has been taken" },
        { status: 400 },
      );
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Email not valid" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password too short" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Password do not match" },
        { status: 400 },
      );
    };

    const hashedPwd = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPwd,
      data: {},
      image: "",
      emailVerified: false,
      verificationToken
    });

    await newUser.save();

    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

    const res = NextResponse.json(
      { success: true, message: "New user created", data: newUser },
      { status: 200 },
    );

    res.cookies.set("AIToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 2,
      path: "/",
    });
    return res;
  } catch (error) {
    console.error("CreateUserError:", error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
};

export async function POST(req) {
  return createUser(req);
}
