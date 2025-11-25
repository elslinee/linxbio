import { connectDB } from "@/utils/server/db/connectDB";
import { LinkBio } from "@/utils/server/schemas/link.bio.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

export async function GET(req, ctx) {
  try {
    await connectDB();
    const { id } = await ctx.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);
    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    const linkBio = await LinkBio.findById(id);

    if (!linkBio) return apiResponse.fail("Not found", 404);

    return apiResponse.success("Loaded", linkBio);
  } catch (err) {
    return apiResponse.fail(err.message, 500);
  }
}

export async function PATCH(req, ctx) {
  try {
    await connectDB();
    const { id } = await ctx.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);
    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    const data = await req.json();

    const updated = await LinkBio.findByIdAndUpdate(id, data, { new: true });

    return apiResponse.success("Updated", updated);
  } catch (err) {
    return apiResponse.fail(err.message, 500);
  }
}

export async function DELETE(req, ctx) {
  try {
    await connectDB();
    const { id } = await ctx.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);
    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    const deleted = await LinkBio.findByIdAndDelete(id);

    return apiResponse.success("Deleted", deleted);
  } catch (err) {
    return apiResponse.fail(err.message, 500);
  }
}
