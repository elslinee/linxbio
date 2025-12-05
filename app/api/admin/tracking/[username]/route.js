import { connectDB } from "@/utils/server/db/connectDB";
import { PageView } from "@/utils/server/schemas/page.view.schema";
import { Click } from "@/utils/server/schemas/click.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);

    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return apiResponse.fail("Unauthorized", 401);
    }

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    const { username } = await params;

    if (!username) {
      return apiResponse.fail("username is required", 400);
    }

    const monthlyViews = await PageView.aggregate([
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

    const allClicks = await Click.find({
      action: { $regex: username, $options: "i" },
    }).sort({ count: -1 });

    const socialClicks = [];
    const buttonClicks = [];

    allClicks.forEach((click) => {
      if (!click?.action) return;

      const parts = click.action.split("-");
      if (parts.length < 3) return;

      const name = parts[parts.length - 1];
      const type = parts[parts.length - 2];

      if (type === "social") {
        socialClicks.push({
          platform: name.toLowerCase(),
          clicks: click.count,
          action: click.action,
        });
      } else if (type === "button" || type === "block") {
        buttonClicks.push({
          name,
          clicks: click.count,
          action: click.action,
        });
      }
    });

    return apiResponse.success(
      "User analytics fetched",
      {
        username,
        monthlyViews,
        socialClicks,
        buttonClicks,
        totalSocialClicks: socialClicks.reduce(
          (sum, item) => sum + item.clicks,
          0,
        ),
        totalButtonClicks: buttonClicks.reduce(
          (sum, item) => sum + item.clicks,
          0,
        ),
        totalPageViews: monthlyViews.reduce((sum, item) => sum + item.views, 0),
      },
      200,
    );
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
