import { NextResponse } from "next/server";
import { decodeEmail } from "../../emailDecoder/route";
import { UserModel } from "../../model/UserModel";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ConnectDb } from "../../utils/ConnectDb";
dotenv.config();

export async function POST(req) {
    await ConnectDb;
    const formdata = await req.FormData();
    const token = formdata.get("token");
    const password = formdata.get("password");
    const confirmPassword = formdata.get("confirmPassword");
    console.log("token:", token, "password:", password, "confirmPassword:", confirmPassword)
    try {
        if (!password || !confirmPassword) {
            return NextResponse.json({ success: false, message: "All field rquired" })
        }
        if (password !== confirmPassword) {
            return NextResponse.json({ success: false, message: "Password not match" }, { status: 400 })
        }
        const email = decodeEmail(token);
        console.log("Email:", email)
        if (!email) {
            return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 400 })
        }
        const user = await UserModel.findOne({ email });
        console.log("User:", user)
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 400 })
        }
        const formalPassword = user.password;
        const isPwdMatch = await bcrypt.compare(password, formalPassword);
        if (isPwdMatch) {
            return NextResponse.json({ success: false, message: "Password already used" }, { status: 400 })
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        const updateForgettenPasswordToken = jwt.sign({ email }, process.env.JWT_SECRET);

        await UserModel.findOneAndUpdate({ email }, { password: hashedPwd, forgettenPasswordToken: updateForgettenPasswordToken }, { new: true });
        return NextResponse.json({ success: true, message: "Password changed successful" }, { status: 200 });

    } catch (error) {
        console.log("Error resetingPwd:", error);
        return NextResponse.json({ success: false, message: "Unable to reset password" }, { status: 500 });
    }
}