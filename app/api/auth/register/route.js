import { connectDB } from "@/utils/server/db/connectDB";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { User } from "@/utils/server/schemas/user.schema";
import { registerValidation } from "@/utils/server/validation/auth.validation";
import { signToken } from "@/utils/server/auth/jwt";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();

    const parsed = registerValidation.safeParse(await request.json());
    if (!parsed.success) {
      const [issue] = parsed.error.issues;
      return apiResponse.fail(`${issue.path[0]}: ${issue.message}`, 400);
    }

    const { fullName, email, password } = parsed.data;

    const existing = await User.findOne({ email });
    if (existing) {
      return apiResponse.fail("Email already exists", 400);
    }


    const newUser = await User.create({
      fullName,
      email,
      password,
    });


    const token = signToken({ id: newUser.id });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return apiResponse.success("Account created & logged in", {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      username: newUser.username,
      isGetStartedDone: newUser.isGetStartedDone,
    });
  } catch (error) {
    return apiResponse.error(error.message, 500, error);
  }
}
