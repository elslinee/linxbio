import { connectDB } from "@/utils/server/db/connectDB";
import { PageView } from "@/utils/server/schemas/page.view.schema";
import { Click } from "@/utils/server/schemas/click.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

export async function DELETE(request, { params }) {
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

    if (!username || typeof username !== "string") {
      return apiResponse.fail("username is required", 400);
    }

    const escapedUsername = username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const deletedPageViews = await PageView.deleteMany({
      slug: { $regex: escapedUsername, $options: "i" },
    });

    const deletedClicks = await Click.deleteMany({
      action: { $regex: escapedUsername, $options: "i" },
    });

    return apiResponse.success(
      "User tracking data reset successfully",
      {
        deletedPageViews: deletedPageViews.deletedCount,
        deletedClicks: deletedClicks.deletedCount,
        username,
      },
      200,
    );
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
