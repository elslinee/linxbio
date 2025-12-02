"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black pt-16 pb-8">
      <div className="cont">
        <div className="mb-12 flex items-center justify-center">
          <div className="flex justify-center items-center flex-col">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src={"/logo-nowall-white.png"}
                width={100}
                height={22}
                alt="logo"
              />
            </Link>
            <p className="max-w-xl md:text-wrap text-balance text-center text-gray-400">
              The all-in-one link in bio tool for creators, influencers, and
              businesses. Share more, sell more, grow more.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 border-t border-gray-800 pt-8 text-center text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} LinxBio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
