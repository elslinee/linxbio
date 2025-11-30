import mongoose from "mongoose";

const serialKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "used"],
      default: "active",
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    usedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const SerialKey =
  mongoose.models.SerialKey || mongoose.model("SerialKey", serialKeySchema);
