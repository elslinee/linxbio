import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/(routes)/(auth)/_components/Button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Side - Decorative */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-black p-10 text-center lg:flex">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 h-full w-full opacity-20">
          <div className="bg-primary absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full blur-2xl filter"></div>
          <div className="absolute top-1/2 right-0 h-64 w-64 animate-pulse rounded-full bg-purple-600 blur-2xl filter"></div>
          <div className="bg-primary absolute -bottom-12 left-1/4 h-80 w-80 animate-pulse rounded-full blur-2xl filter"></div>
        </div>

        {/* Content */}
        <div className="z-10 max-w-lg">
          <h1 className="mb-6 text-5xl font-black tracking-tight text-white">
            Welcome back!
          </h1>
          <p className="text-lg leading-relaxed text-gray-400">
            Sign in to access your personalized dashboard and manage your smart
            links effortlessly.
          </p>

          {/* Decorative Lines */}
        </div>

        {/* Abstract Line Pattern Overlay */}
        <svg
          className="absolute right-0 bottom-0 h-full w-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100 C 20 0 50 0 100 100 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <path
            d="M0 100 C 30 20 70 20 100 100 Z"
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
            <h2 className="text-3xl font-black text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to continue
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              {/* Username/Email Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Username or email"
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="text-primary accent-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                href="#"
                className="font-medium text-gray-600 hover:text-black"
              >
                Forgot password?
              </Link>
            </div>

            <Button>Sign In</Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            New here?{" "}
            <Link
              href="/register"
              className="font-bold text-black hover:underline"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
