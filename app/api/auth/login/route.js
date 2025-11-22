import { loginValidation } from "@/utils/server/validation/auth.validation";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { connectDB } from "@/utils/server/db/connectDB";
import { User } from "@/utils/server/schemas/user.schema";
import { signToken } from "@/utils/server/auth/jwt";
import { cookies } from "next/headers";
export async function POST(request) {
  try {
    await connectDB();

    const parsed = loginValidation.safeParse(await request.json());
    if (!parsed.success) {
      const [issue] = parsed.error.issues;
      return apiResponse.fail(`${issue.path[0]}: ${issue.message}`, 400);
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return apiResponse.fail("User not found", 404);

    if (!(await user.comparePassword(password))) {
      return apiResponse.fail("Invalid password", 401);
    }

    const token = signToken({ id: user.id });
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return apiResponse.success("Login successful", {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return apiResponse.error(error.message, 500);
  }
}
