import { NextResponse } from "next/server";
import { UserModel } from "../../model/UserModel";
import { ConnectDb } from "../../utils/ConnectDb";
import dotenv from "dotenv";
import { decodeEmail } from "../../emailDecoder/route";
dotenv.config();

export async function POST(req) {
    const reqBody = await req.json();
    await ConnectDb();
    try {
        const { token } = reqBody;
        if (!token) {
            return NextResponse.json({ success: false, message: "No token provided" }, { status: 400 });
        }
        const email = await decodeEmail(token);
        if (!email) {
            return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
        }

        // geting user for frontend purpose
        const user = await UserModel.findOne({email});

        // Update the user's verification status 
        const updatedUser = await UserModel.findOneAndUpdate(
            { email }, // Filter to find the user by email
            { emailVerified: true, verificationToken: "" }, // Update fields
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "Failed to update user verification status" }, { status: 500 });
        }

        const res = NextResponse.json({ success: true, message: "User signed up and verified", data: user }, { status: 200 });
        res.cookies.set("AIToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 2,
            path: "/",
        });
        return res;
    } catch (error) {
        console.log("VerifyEmailError:", error);
        return NextResponse.json({ success: false, message: "Unable to verify email" });
    }
}