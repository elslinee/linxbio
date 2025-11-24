import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserFromCookies = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing in environment");

    const decoded = jwt.verify(token, secret);

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    return null;
  }
};
