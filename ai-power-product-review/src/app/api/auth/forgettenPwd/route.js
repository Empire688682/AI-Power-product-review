import { sendPasswordResettingEmail } from "../sendForgettenPwdEmail/route";
import dotenv from "dotenv";
import { NextResponse } from "next/server";
dotenv.config();

export async function POST (req){
    try {
        const reqBody = await req.json();
        const { email } = reqBody;
        if(!email){
            return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
        }
        const resetingPwdLink = `${process.env.BASE_URL}/resetpassword?token=${email}`
        await sendPasswordResettingEmail(email, resetingPwdLink);
        return NextResponse.json({ success: true, message: "Email sent" }, { status: 200 });
    } catch (error) {
        console.log("ERROR:", error);
        return NextResponse.json({ success: false, message: "Unable to send email" }, { status: 500 });
    }
};