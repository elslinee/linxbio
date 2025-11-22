import { cookies } from "next/headers";
import { apiResponse } from "@/utils/server/responses/apiResponse";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return apiResponse.success("Logged out successfully");
}
