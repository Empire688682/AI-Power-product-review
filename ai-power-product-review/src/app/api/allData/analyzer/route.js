import dotenv from "dotenv";
import { NextResponse } from "next/server";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const analyzeText = async (req) => {
    if (req.method === "POST") {
        try {
            const reqBody = await req.json();
            const { text } = reqBody;
            if (!text) {
                return NextResponse.json(
                    { success: false, message: "No text data from Frontend" },
                    { status: 400 },
                );
            };
            const response = await openai.chat.completions.create({
                model: "o1-preview-2024-09-12",
                store: true,
                messages: [{ role: "user", content: `Analyze the sentiment of this text: "${text}". Respond with Positive, Negative, or Neutral.` }]
            });
            console.log("response:", response);
            return NextResponse.json(
                {
                    success: true,
                    data: response.data,
                    message: "Text analyzed successful",
                },
                { status: 200 },
            );
        } catch (error) {
            console.log("ERROR:", error);
            return NextResponse.json(
                { success: false, message: "An error occurred", error: error.message },
                { status: 500 },
            );
        }
    }
};

export async function POST(req) {
    return analyzeText(req);
}
