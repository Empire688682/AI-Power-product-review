import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Object, default: {} },
  date: { type: Date, default: Date.now },
});

export const DataModel =
  mongoose.models.Data || mongoose.model("Data", dataSchema);
