import { connectDB } from "@/utils/server/db/connectDB";
import { SerialKey } from "@/utils/server/schemas/serialKey.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";
import crypto from "crypto";

export async function GET(request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);

    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    const keys = await SerialKey.find().sort({ createdAt: -1 });

    return apiResponse.success("Serial keys list", keys);
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);

    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    // Generate a random key (e.g., XXXX-XXXX-XXXX)
    const key = crypto
      .randomBytes(6)
      .toString("hex")
      .toUpperCase()
      .match(/.{1,4}/g)
      .join("-");

    const newKey = await SerialKey.create({
      key,
    });

    return apiResponse.success("Serial key created", newKey);
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}
