import { redirect } from "next/navigation";
export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    response_type: "code",
    scope: "profile email",
  });
  return redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
