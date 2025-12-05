import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/server/db/connectDB";
import { User } from "@/utils/server/schemas/user.schema";

async function generateUniqueUsername(email) {
  let baseUsername = email.split("@")[0].toLowerCase();

  baseUsername = baseUsername.replace(/[^a-z0-9_-]/g, "");

  if (baseUsername.length < 3) {
    baseUsername = baseUsername.padEnd(3, "0");
  }

  baseUsername = baseUsername.substring(0, 30);

  let username = baseUsername;
  let counter = 1;

  while (await User.findOne({ username })) {
    const suffix = counter.toString();
    const maxBaseLength = 30 - suffix.length;
    username = baseUsername.substring(0, maxBaseLength) + suffix;
    counter++;
  }

  return username;
}

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "No authorization code" },
        { status: 400 },
      );
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: tokenData }, { status: 500 });
    }

    const userInfo = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    ).then((r) => r.json());

    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      const username = await generateUniqueUsername(userInfo.email);

      user = await User.create({
        fullName: userInfo.name,
        email: userInfo.email,
        username: username,
        password: null,
        provider: "google",
        picture: userInfo.picture,
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );

    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: jwtToken,
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return NextResponse.redirect(
      process.env.NEXTAUTH_URL || "https://linxbio.vercel.app",
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
