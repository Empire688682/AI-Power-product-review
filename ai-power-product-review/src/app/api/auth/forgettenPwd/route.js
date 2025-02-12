import { sendPasswordResettingEmail } from "../sendForgettenPwdEmail/route";
import dotenv from "dotenv";
import { NextResponse } from "next/server";
import { UserModel } from "../../model/UserModel";
import { ConnectDb } from "../../utils/ConnectDb";
ConnectDb
dotenv.config();

export async function POST (req){
    try {
        const reqBody = await req.json();
        const { email } = reqBody;
        if(!email){
            return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });
        };
        const user = await UserModel.findOne({ email });
        if(!user){
            return NextResponse.json({ success: false, message: "User not found" }, { status: 400 });
        };
        const forgettenPasswordToken = jwt.sign({ email }, process.env.JWT_SECRET);
        await UserModel.findOneAndUpdate({ email }, { forgettenPasswordToken }, { new: true });

        const resetingPwdLink = `${process.env.BASE_URL}/resetpassword?Emailtoken=${forgettenPasswordToken}`
        await sendPasswordResettingEmail(email, resetingPwdLink);
        return NextResponse.json({ success: true, message: "Email sent" }, { status: 200 });
    } catch (error) {
        console.log("ERROR:", error);
        return NextResponse.json({ success: false, message: "Unable to send email" }, { status: 500 });
    }
};