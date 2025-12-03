// schemas/page.view.schema.js
import mongoose from "mongoose";

const PageViewSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const PageView =
  mongoose.models.PageView || mongoose.model("PageView", PageViewSchema);
