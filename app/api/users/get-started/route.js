import { NextResponse } from "next/server";
import { connectDB } from "@/utils/server/db/connectDB";
import { User } from "@/utils/server/schemas/user.schema";
import { getUserFromCookies } from "@/utils/server/auth/getUserFromCookies";

export async function POST(req) {
  try {
    await connectDB();

    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { isGetStartedDone } = await req.json();

    if (typeof isGetStartedDone !== "boolean") {
      return NextResponse.json(
        { message: "isGetStartedDone must be boolean" },
        { status: 400 },
      );
    }

    await User.findByIdAndUpdate(user.id, { isGetStartedDone }, { new: true });

    return NextResponse.json({
      success: true,
      message: "Get Started status updated",
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
