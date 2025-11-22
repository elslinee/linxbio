import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { connectDB } from "@/utils/server/db/connectDB";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return apiResponse.fail("Unauthorized", 401);
    }

    // 2) تحقق من التوكين
    const decoded = verifyToken(token);
    if (!decoded) {
      return apiResponse.fail("Invalid or expired token", 401);
    }

    // 3) هات بيانات اليوزر من DB
    const user = await User.findById(decoded.id);

    if (!user) {
      return apiResponse.fail("User not found", 404);
    }

    // 4) رجّع بيانات اليوزر (بدون الباسورد)
    return apiResponse.success("User data", {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}
