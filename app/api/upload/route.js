import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // اقرأ الـ formData
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { status: "error", message: "No file uploaded" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json(
      {
        status: "success",
        message: "File uploaded",
        url: `/uploads/${filename}`,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 },
    );
  }
}
