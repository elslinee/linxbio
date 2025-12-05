import { connectDB } from "@/utils/server/db/connectDB";
import { Click } from "@/utils/server/schemas/click.schema";
import { apiResponse } from "@/utils/server/responses/apiResponse";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/server/auth/jwt";
import { User } from "@/utils/server/schemas/user.schema";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { action } = body;

    if (!action) {
      return apiResponse.fail("action is required", 400);
    }

    let click = await Click.findOne({ action });

    if (!click) {
      click = await Click.create({ action, count: 1 });
    } else {
      click.count += 1;
      await click.save();
    }

    return apiResponse.success("Click tracked", click, 200);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return apiResponse.fail("Unauthorized", 401);

    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return apiResponse.fail("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (currentUser.role === "admin") {
      const allClicks = await Click.find().sort({ count: -1 });
      return apiResponse.success("All clicks fetched (admin)", allClicks, 200);
    }

    if (!username) {
      return apiResponse.fail("username is required for non-admin users", 400);
    }

    const userClicks = await Click.find({
      action: { $regex: username, $options: "i" },
    }).sort({ count: -1 });

    return apiResponse.success("User clicks fetched", userClicks, 200);
  } catch (error) {
    return apiResponse.fail(error.message, 500);
  }
}
