import { NextResponse } from "next/server";
import { connectDB } from "@/utils/server/db/connectDB";
import { User } from "@/utils/server/schemas/user.schema";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";

export async function POST(req) {
  try {
    const { username } = await req.json();

    await connectDB();

    const userExists = await User.findOne({ username });

    const linkBioExists = await LinkBio.findOne({
      "profile.username": username,
    });

    const exists = userExists || linkBioExists;

    return NextResponse.json({
      available: !exists,
    });
  } catch (err) {
    return NextResponse.json(
      {
        available: false,
        error: "Server error",
      },
      { status: 500 },
    );
  }
}
