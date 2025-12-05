"use client";
import React, { useEffect, useState } from "react";
import { getLinkBioByUsername } from "@/utils/client/admin/linkBioApi";
import { RotateCcw, ArrowLeft, User, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function UserDetailsView({ username, onBack }) {
  const [linkBio, setLinkBio] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    getLinkBioByUsername(username)
      .then((linkBioRes) => {
        if (linkBioRes?.data?.data) {
          setLinkBio(linkBioRes.data.data);
          if (linkBioRes.data.data.userId) {
            setUser(linkBioRes.data.data.userId);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          User Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                Username
              </label>
              <div className="flex items-center gap-2 text-gray-900">
                <User size={16} />
                <span>@{linkBio?.profile?.username || user?.username}</span>
              </div>
            </div>

            {user && (
              <>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                    Full Name
                  </label>
                  <p className="text-gray-900">{user.fullName || "N/A"}</p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                    Email
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                    Role
                  </label>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </div>

                {user.createdAt && (
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                      Created At
                    </label>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Calendar size={16} />
                      <span>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {linkBio && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                  Display Name
                </label>
                <p className="text-gray-900">
                  {linkBio.profile?.displayName || "Untitled"}
                </p>
              </div>

              {linkBio.profile?.avatar && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                    Avatar
                  </label>
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={linkBio.profile.avatar}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {linkBio.profile?.bio && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                    Bio
                  </label>
                  <p className="text-gray-900">{linkBio.profile.bio}</p>
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                  Verified Badge
                </label>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    linkBio.profile?.verifiedBadge
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {linkBio.profile?.verifiedBadge ? "Verified" : "Not Verified"}
                </span>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 uppercase">
                  Public URL
                </label>
                <Link
                  href={`/${linkBio.profile?.username}`}
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  /{linkBio.profile?.username}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetailsView;
