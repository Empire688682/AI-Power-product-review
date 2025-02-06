import dotenv from "dotenv";
import { NextResponse } from "next/server";
import Sentiment from "sentiment";
dotenv.config();

const sentiment = new Sentiment();
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
            const result = sentiment.analyze(text);
            return NextResponse.json(
                {
                    success: true,
                    data: result,
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
