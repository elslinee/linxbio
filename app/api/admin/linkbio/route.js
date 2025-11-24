import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { getUserFromCookies } from "@/utils/server/auth/getUserFromCookies";

export async function GET(request) {
  try {
    await connectDB();

    // // 🔐 check admin
    // const user = await getUserFromCookies();
    // if (!user || user.role !== "admin") {
    //   return apiResponse.fail("Unauthorized", 403);
    // }

    // 📌 Pagination
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // 📌 Count all documents
    const total = await LinkBio.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // 📌 Fetch page data
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
