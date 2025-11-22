import { connectDB } from "@/utils/server/db/connectDB";
import { User } from "@/utils/server/schemas/user.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";

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

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select("-password")
      .sort({ createdAt: -1 });

    return apiResponse.success("Users list", {
      users,
      page,
      limit,
      totalUsers,
      totalPages,
    });
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}
