import { connectDB } from "@/utils/server/db/connectDB";
import { SerialKey } from "@/utils/server/schemas/serialKey.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

export async function POST(request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const { key } = await request.json();

    if (!key) {
      return apiResponse.fail("Key is required", 400);
    }

    const serialKey = await SerialKey.findOne({ key });

    if (!serialKey) {
      return apiResponse.fail("Invalid key", 404);
    }

    if (serialKey.status === "used") {
      return apiResponse.fail("Key already used", 400);
    }

    serialKey.status = "used";
    serialKey.usedBy = userId;
    serialKey.usedAt = new Date();
    await serialKey.save();

    return apiResponse.success("Key redeemed successfully", serialKey);
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}
