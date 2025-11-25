import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { User } from "@/utils/server/schemas/user.schema";
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { userId, profile, socials, template } = body;

    const used = await LinkBio.findOne({
      "profile.username": profile.username,
    });

    if (used) {
      return apiResponse.fail("Username already taken", 400);
    }

    const created = await LinkBio.create({
      userId,
      profile,
      socials,
      template,
    });

    await User.findByIdAndUpdate(userId, {
      username: profile.username,
      isGetStartedDone: true,
    });
    return apiResponse.success("LinkBio created", created, 200);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const linkBio = await LinkBio.find();

    return apiResponse.success("LinkBio fetched", linkBio, 200);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
