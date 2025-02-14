import { NextResponse } from "next/server";
import { UserModel } from "../../model/UserModel";
import { ConnectDb } from "../../utils/ConnectDb";
import { DataModel } from "../../model/DataModel";
import dotenv from "dotenv";
dotenv.config();
export async function POST(req) {
  try {
    await ConnectDb();
    const reqBody = await req.json();
    console.log("reqBody:", reqBody);
    const { userId, data } = reqBody;
    console.log("userId");
    const user = await UserModel.findOne({ _userid: userId });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not allow" });
    }
    const newData = await new DataModel({
      userId: userId,
      data,
    });
    await newData.save();
    return NextResponse.json({
      success: true,
      message: "Data added successful",
      data: newData,
    });
  } catch (error) {
    console.log("Adding Data Error:", error);
    return NextResponse.json({ success: false, message: "Adding data error" });
  }
}
