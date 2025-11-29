import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { getUserFromCookies } from "@/utils/server/auth/getUserFromCookies";

export async function PATCH(req) {
  try {
    await connectDB();

    // 1. Check auth
    const user = await getUserFromCookies();
    if (!user) return apiResponse.fail("Unauthorized", 401);

    // 2. Read body
    const { order } = await req.json();

    if (!Array.isArray(order)) {
      return apiResponse.fail("Invalid order (must be an array)", 400);
    }

    // 3. Update socialsOrder field
    const updated = await LinkBio.findOneAndUpdate(
      { userId: user.id },
      { socialsOrder: order },
      { new: true },
    );

    if (!updated) return apiResponse.fail("LinkBio not found", 404);

    return apiResponse.success("Social order updated", updated.socialsOrder);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
