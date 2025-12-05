import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

export async function GET(req, ctx) {
  try {
    await connectDB();
    const { username } = await ctx.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);
    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    const linkBio = await LinkBio.findOne({
      "profile.username": username,
    }).populate("userId", "username email fullName role createdAt");

    if (!linkBio) return apiResponse.fail("Not found", 404);

    return apiResponse.success("Loaded", linkBio);
  } catch (err) {
    return apiResponse.fail(err.message, 500);
  }
}
