import { UserModel } from "../model/UserModel";
import { ConnectDb } from "../utils/ConnectDb";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import path from "path";
import fs from "fs/promises";
dotenv.config();

const profileImage = async (req) =>{
        await ConnectDb();
        const formData  = await req.formData();
        const image = formData.get("image");
        try {
            
        } catch (error) {
            
        }
}

export async function POST(req){
    if(req.method !== "POST"){
        return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
    }
    return profileImage(req)
}


