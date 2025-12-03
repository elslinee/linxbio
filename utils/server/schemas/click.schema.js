import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema(
  {
    action: { type: String, unique: true, trim: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Click =
  mongoose.models.Click || mongoose.model("Click", ClickSchema);
