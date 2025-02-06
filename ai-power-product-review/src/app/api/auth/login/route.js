import { NextResponse } from "next/server";
import { UserModel } from "../../model/UserModel";
import { ConnectDb } from "../../utils/ConnectDb";
import validator from "validator";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

const loginUser = async (req) => {
    if (req.method === "POST") {
        const reqBody = await req.json();
        try {
            await ConnectDb()
            const {email, password} = reqBody;
            if (!email || !password) {
                return NextResponse.json({ success: false, message: "All field required" }, { status: 400 });
            };

            if (!validator.isEmail(email)) {
                return NextResponse.json({ success: false, message: "Email not valid" }, { status: 400 });
            };

            const user = await UserModel.findOne({email});
            if (!user) {
                return NextResponse.json({ success: false, message: "User not found" }, { status: 400 });
            };

            const isPwdMatch = await bcrypt.compare(user.password, password);
            if(!isPwdMatch){
                return NextResponse.json({ success: false, message: "Incorect password" }, { status: 400 });
            }

            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

            const res = NextResponse.json({ success: true, message: "New user login", data: user }, { status: 200 });

            res.cookies.set("AIToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 2,
                path: "/"
            });
            return res

        } catch (error) {
            console.error("CreateUserError:", error);
            return NextResponse.json({ success: true, message: error }, { status: 500 });
        }
    };
}

export async function POST(req){
    return loginUser(req);
}