import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/(routes)/(auth)/_components/Button";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Side - Decorative */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-black p-10 text-center lg:flex">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 h-full w-full opacity-20">
          <div className="absolute -top-24 -right-24 h-96 w-96 animate-pulse rounded-full bg-purple-600 blur-3xl filter"></div>
          <div className="bg-primary absolute top-1/2 left-0 h-64 w-64 animate-pulse rounded-full blur-2xl filter"></div>
          <div className="absolute right-1/4 -bottom-12 h-80 w-80 animate-pulse rounded-full bg-white blur-2xl filter"></div>
        </div>

        {/* Content */}
        <div className="z-10 max-w-lg">
          <h1 className="mb-6 text-5xl font-black tracking-tight text-white">
            Join the Revolution
          </h1>
          <p className="text-lg leading-relaxed text-gray-400">
            Create your account today and start building your ultimate
            link-in-bio experience.
          </p>
        </div>

        {/* Abstract Line Pattern Overlay */}
        <svg
          className="absolute bottom-0 left-0 h-full w-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M100 0 C 80 100 50 100 0 0 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <path
            d="M100 0 C 70 80 30 80 0 0 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-white p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-900">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign up for free and start exploring
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-900 transition-all outline-none focus:bg-white focus:ring-2"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-900 transition-all outline-none focus:bg-white focus:ring-2"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-900 transition-all outline-none focus:bg-white focus:ring-2"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-900 transition-all outline-none focus:bg-white focus:ring-2"
                />
              </div>
            </div>

            <Button>Create Account</Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-black hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
