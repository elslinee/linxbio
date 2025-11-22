import { NextResponse } from "next/server";
import { verifyToken } from "./utils/server/auth/jwt";

export default async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/user")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 },
      );
    }
  }

  return NextResponse.next();
}
