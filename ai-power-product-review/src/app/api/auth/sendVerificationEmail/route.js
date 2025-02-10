import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (toEmail, verificationLink) => {
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:Number(process.env.EMAIL_PORT),
            secure:true,
            auth: {
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false  // Allows self-signed certificates
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "Email Verification",
            html: `<p>Please verify your email by clicking on the link:<a href="${verificationLink}">Verify Email</a></p>`
        };
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', toEmail);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send verification email');
    }
}