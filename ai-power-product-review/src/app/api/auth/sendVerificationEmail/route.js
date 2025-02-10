import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { NextResponse } from "next/server";
dotenv.config();

export const sendVerificationEmail = async (toEmail, verificationLink) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls:{
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "Email verification",
            html: `<p>Please verify your email:<a href=${verificationLink}> ${verificationLink} </a> </p>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Verification email sent to:", toEmail);
    } catch (error) {
        console.log("SENDING EMAIL ERROR:", error);
        return NextResponse.json({success:false, message:"Sending verification email error"});
    };
}