import { UserModel } from "../model/UserModel";
import { ConnectDb } from "../utils/ConnectDb";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import path from "path";
import fs from "fs/promises";
dotenv.config();

const profileImage = async (req) => {
    try {
        await ConnectDb();
        const formData = await req.formData();
        const image = formData.get("image");
        const userId = formData.get("userId");
        const user = await UserModel.findById(userId);
        if(!user){
            return NextResponse.json({success:false, message:"User not authorized"})
        };

        const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validImageTypes.includes(image.type)) {
          return NextResponse.json(
            { success: false, message: "Invalid image type" },
            { status: 400 },
          );
        }
  
        if (image.size > 1024 * 1024 * 5) {
          return NextResponse.json(
            { success: false, message: "Image size too large" },
            { status: 400 },
          );
        }
        const saveImage = image.name.replace(/[^a-zA-Z0-9-_.]/g, "");
        
        const imageName = `${Date.now()}_${saveImage}`;

        const imagePathname = path.join(process.cwd(), "public", "images");

        await fs.stat(imagePathname).catch(()=> fs.mkdir(imagePathname, {recursive:true}));

        const buffer = Buffer.from(await image.arrayBuffer());

        await fs.writeFile(path.join(imagePathname, imageName), buffer);

        await UserModel.findOneAndUpdate({_id:userId}, {image:imageName}, {new:true});
        
        return NextResponse.json({ success: true, message: "Profile image updated successfully" , imageUrl: `/images/${imageName}`});

    } catch (error) {
        console.log("ERROR:",error);
        return NextResponse.json(
            { success: false, message: "Error adding IMG" },
            { status: 500 },
          );
    }
}

export async function POST(req) {
    if (req.method !== "POST") {
        return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
    }
    return profileImage(req)
}


