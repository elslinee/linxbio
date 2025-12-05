import { connectDB } from "@/utils/server/db/connectDB";
import { PageView } from "@/utils/server/schemas/page.view.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

export async function POST(req) {
  await connectDB();

  const { slug } = await req.json();
  if (!slug) return apiResponse.fail("slug is required", 400);

  await PageView.create({ slug });

  return apiResponse.success("View tracked");
}

export async function GET(request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);

    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return apiResponse.fail("Unauthorized", 401);

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (currentUser.role === "admin") {
      const allViews = await PageView.aggregate([
        {
          $group: {
            _id: { month: { $month: "$createdAt" } },
            views: { $sum: 1 },
          },
        },
        {
          $project: {
            month: "$_id.month",
            views: 1,
            _id: 0,
          },
        },
        { $sort: { month: 1 } },
      ]);

      return apiResponse.success("Admin monthly views", allViews, 200);
    }

    if (!username)
      return apiResponse.fail("username is required for non-admin users", 400);

    const userViews = await PageView.aggregate([
      {
        $match: { slug: { $regex: username, $options: "i" } },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          views: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id.month",
          views: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);

    return apiResponse.success("User monthly views", userViews, 200);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
