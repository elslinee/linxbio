import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

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

    const total = await LinkBio.countDocuments();
    const totalPages = Math.ceil(total / limit);


    const linkbios = await LinkBio.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return apiResponse.success("LinkBios loaded", {
      data: linkbios,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    return apiResponse.fail(err.message, 500);
  }
}
