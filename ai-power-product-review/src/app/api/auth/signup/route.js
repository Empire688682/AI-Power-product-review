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
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPwd,
      data: {},
      image: "",
      emailVerified: false,
      verificationToken,
    });

    await newUser.save();

    const verificationLink =
      `${process.env.BASE_URL}/verify-email?token=${verificationToken}/username=${username}` ||
      "http://localhost:3000";
    await sendVerificationEmail(email, verificationLink);

    return NextResponse.json(
      { success: true, message: "New user created", data: newUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("CreateUserError:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while creating the user." },
      { status: 500 },
    );
  }
};

export async function POST(req) {
  return createUser(req);
}
