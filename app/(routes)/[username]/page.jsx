import { getLinkBioByUsername } from "@/utils/client/user/linkBioApi";
import Link from "next/link";
import React from "react";
import Wrapper from "@/app/(routes)/[username]/_components/Wrapper";

export async function generateMetadata({ params }) {
  const { username } = await params;

  try {
    const userData = await getLinkBioByUsername(username);
    const user = userData?.data?.data;

    return {
      title: `${user?.profile?.displayName} | LinkBio`,
      description: user?.profile?.bio || "View profile on LinkBio",
      openGraph: {
        title: `${user?.profile?.displayName || username} | LinkBio`,
        description: user?.profile?.bio || "",
        images: [user?.profile?.avatar || "/default-og.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: `${user?.profile?.displayName || username} | LinkBio`,
        description: user?.profile?.bio || "",
        images: [user?.profile?.avatar || "/default-og.png"],
      },
    };
  } catch {
    return {
      title: "User Not Found | LinkBio",
      description: "This user does not exist",
    };
  }
}

export default async function Page({ params }) {
  const { username } = await params;

  let user = null;

  try {
    const data = await getLinkBioByUsername(username);
    user = data?.data?.data;
  } catch (error) {
    return (
      <div className="items center flex min-h-screen justify-center">
        <div className="-translate-y-1/ absolute top-1/2">
          <h2 className="text-3xl font-bold">{`User Not Found :(`}</h2>
          <Link
            href={"/"}
            className="bg-primary shadow-primary mx-auto mt-4 flex w-fit items-center justify-center rounded-xl px-4 py-2 text-base font-bold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <Wrapper user={user} />;
}
