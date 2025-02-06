import dotenv from "dotenv";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY }),
);
const analyzeText = async (req) => {
  if (req.method === "POST") {
    try {
      const reqBody = await req.json();
      const { text } = reqBody;
      if (!text) {
        return NextResponse.json(
          { success: false, message: "No text data from backend" },
          { status: 400 },
        );
      }
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Analyze the sentiment of this text: "${text}". Respond with Positive, Negative, or Neutral.`,
          },
        ],
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
