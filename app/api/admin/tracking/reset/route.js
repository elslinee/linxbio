import { connectDB } from "@/utils/server/db/connectDB";
import { PageView } from "@/utils/server/schemas/page.view.schema";
import { Click } from "@/utils/server/schemas/click.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

export async function DELETE(request) {
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

    const deletedPageViews = await PageView.deleteMany({});
    const deletedClicks = await Click.deleteMany({});

    return apiResponse.success(
      "All tracking data reset successfully",
      {
        deletedPageViews: deletedPageViews.deletedCount,
        deletedClicks: deletedClicks.deletedCount,
      },
      200,
    );
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
