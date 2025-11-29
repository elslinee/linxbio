import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { username } = await params;

    const linkBio = await LinkBio.findOne({
      "profile.username": username,
    });

    if (!linkBio) return apiResponse.fail("User not found", 404);

    const publicData = {
      profile: linkBio.profile,
      socials: linkBio.socials,
      template: linkBio.template,
      socialsOrder: linkBio.socialsOrder,
      blocks: linkBio.blocks,
    };

    return apiResponse.success("Public profile loaded", publicData);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
