import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { getUserFromCookies } from "@/utils/server/auth/getUserFromCookies";

export async function PATCH(req) {
  try {
    await connectDB();

    const user = await getUserFromCookies();
    if (!user) return apiResponse.fail("Unauthorized", 401);

    const { order } = await req.json();

    if (!Array.isArray(order)) {
      return apiResponse.fail("Invalid order (must be an array)", 400);
    }


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
