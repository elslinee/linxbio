import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { getUserFromCookies } from "@/utils/server/auth/getUserFromCookies";

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromCookies();
    if (!user) return apiResponse.fail("Unauthorized", 401);

    const linkBio = await LinkBio.findOne({ userId: user.id });

    if (!linkBio) return apiResponse.fail("LinkBio not found", 404);

    return apiResponse.success("LinkBio loaded", linkBio);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}

export async function PATCH(req) {
  try {
    await connectDB();

    const user = await getUserFromCookies();
    if (!user) return apiResponse.fail("Unauthorized", 401);

    const data = await req.json();

    const updated = await LinkBio.findOneAndUpdate({ userId: user.id }, data, {
      new: true,
    });

    if (!updated) return apiResponse.fail("LinkBio not found", 404);

    return apiResponse.success("LinkBio updated", updated);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}

export async function DELETE() {
  try {
    await connectDB();

    const user = await getUserFromCookies();
    if (!user) return apiResponse.fail("Unauthorized", 401);

    const deleted = await LinkBio.findOneAndDelete({ userId: user.id });

    if (!deleted) return apiResponse.fail("LinkBio not found", 404);

    return apiResponse.success("LinkBio deleted successfully");
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
