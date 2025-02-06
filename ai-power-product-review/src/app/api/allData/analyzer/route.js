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

      if (!text.trim()) {
        return NextResponse.json(
          { success: false, message: "Text cannot be empty" },
          { status: 400 },
        );
      }
      if (!text) {
        return NextResponse.json(
          { success: false, message: "No text data from Frontend" },
          { status: 400 },
        );
      }
      if (text.length > 1000) {
        return NextResponse.json(
          { success: false, message: "Text is too long to analyze" },
          { status: 400 },
        );
      }
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
