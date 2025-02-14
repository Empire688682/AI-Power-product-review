import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    userId:{type:String, unique:true},
    data:{type:Object, default:{}},
    date:{type:Date.now().toLocaleString}
});

export const DataModel = mongoose.model.Data || mongoose.models("Data", dataSchema);