import mongoose, { Schema } from "mongoose";
import { ConnectDb } from "../utils/ConnectDb";
import { unique } from "next/dist/build/utils";

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique},
    password:{type:String, required:true},
    data:{type:Object, default:""},
});

export const UserModel = mongoose.model.User || mongoose.models("User", userSchema);

