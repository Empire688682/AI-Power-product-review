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
        const {token} = reqBody;
        if(!token){
            return NextResponse.json({ success: false, message: "No token provided" }, { status: 400 });
        }
        const email = await decodeEmail(token);
        console.log("Email:", email);
        if (!email) {
            return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
        }

        

        return NextResponse.json({success:true});
    } catch (error) {
        console.log("VerifyEmailError:", error);
        return NextResponse.json({success:false, message:"Unable to verify email"});
    }
}