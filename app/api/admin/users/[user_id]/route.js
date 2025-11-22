import { connectDB } from "@/utils/server/db/connectDB";
import { User } from "@/utils/server/schemas/user.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";

export async function GET(_, { params }) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);

    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    const { user_id } = await params;
    const user = await User.findById(user_id).select("-password");

    if (!user) return apiResponse.fail("User not found", 404);

    return apiResponse.success("User found", user);
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);

    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }

    const { user_id } = await params;
    const body = await request.json();

    const updatedUser = await User.findByIdAndUpdate(user_id, body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) return apiResponse.fail("User not found", 404);

    return apiResponse.success("User updated", updatedUser);
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const user = verifyToken(token);
    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);
    if (currentUser.role !== "admin") {
      return apiResponse.fail("Admins only", 403);
    }
    const { user_id } = await params;
    const deletedUser = await User.findByIdAndDelete(user_id);
    if (!deletedUser) return apiResponse.fail("User not found", 404);
    return apiResponse.success("User deleted", deletedUser);
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}
