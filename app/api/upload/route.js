import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const preset = process.env.CLOUDINARY_PRESET;

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const newForm = new FormData();
    newForm.append("file", file);
    newForm.append("upload_preset", preset);

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: newForm,
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
