import { connectDB } from "@/utils/server/db/connectDB";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { User } from "@/utils/server/schemas/user.schema";
import { registerValidation } from "@/utils/server/validation/auth.validation";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const validation = registerValidation.safeParse(body);
    if (!validation.success) {
      const { path, message } = validation.error.issues[0];
      return apiResponse.fail(`${path[0]} : ${message}`, 400);
    }
    const { fullName, email, password } = validation.data;
    const user = await User.findOne({ email });
    if (user) {
      return apiResponse.fail("Email already exists", 400);
    }
    const newUser = await User.create({ fullName, email, password });
    return apiResponse.success("User created successfully", {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    return apiResponse.error(error.message, 500, error);
  }
}
