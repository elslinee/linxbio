"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { login } from "@/utils/client/user/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const signInMethods = [
  {
    id: "google",
    icon: faGoogle,
    name: "Google",
    href: "/api/auth/google",
  },
];
export default function LoginPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateField = (name, value) => {
    let message = "";

    if (name === "email") {
      if (!value.trim()) message = "Email is required";
      else if (!emailRegex.test(value)) message = "Invalid email format";
    }
    if (name === "password") {
      if (!value) message = "Password is required";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };
  useEffect(() => {
    const isFilled = !Object.values(userData).some((value) => !value);
    const isValid = !Object.values(errors).some((error) => error);
    setAllowSubmit(isFilled && isValid);
  }, [userData, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };
  const loginRequest = async () => {
    const hasErrors = Object.values(errors).some((e) => e);
    const isEmpty = Object.values(userData).some((v) => !v);
    if (hasErrors || isEmpty) return;
    try {
      setLoading(true);
      const res = await login(userData);
      setUser(res.data.data);
      setUserData({ email: "", password: "" });
      setServerError("");
      router.push("/");
    } catch (err) {
      const errMesg = err?.response?.data?.message;
      if (errMesg) {
        setServerError(errMesg);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <div className="flex min-h-screen w-full font-sans">
      <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-black p-10 text-center lg:flex">
        <div className="absolute top-0 left-0 h-full w-full opacity-20">
          <div className="bg-primary absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full blur-2xl filter"></div>
          <div className="absolute top-1/2 right-0 h-64 w-64 animate-pulse rounded-full bg-purple-600 blur-2xl filter"></div>
          <div className="bg-primary absolute -bottom-12 left-1/4 h-80 w-80 animate-pulse rounded-full blur-2xl filter"></div>
        </div>

        <div className="z-10 max-w-lg">
          <h1 className="mb-6 text-5xl font-black tracking-tight text-white">
            Welcome back!
          </h1>
          <p className="text-lg leading-relaxed text-gray-400">
            Sign in to access your personalized dashboard and manage your smart
            links effortlessly.
          </p>
        </div>

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

      <div className="flex w-full flex-col items-center justify-center bg-white p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {serverError && <p className="text-red-500">{serverError}</p>}
              <div className="relative">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                  </div>
                  <input
                    name="email"
                    onChange={handleChange}
                    type="text"
                    placeholder="Username or email"
                    className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-900 transition-all outline-none focus:bg-white focus:ring-2"
                  />
                </div>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div className="relative">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
                  </div>
                  <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-sm text-gray-900 transition-all outline-none focus:bg-white focus:ring-2"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
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

            <Button
              type="submit"
              loading={loading}
              className={`${allowSubmit && !loading ? "" : "pointer-events-none opacity-50"}`}
            >
              Sign In
            </Button>
          </form>
          <div className="flex flex-col justify-end gap-4">
            <div className="flex flex-col items-center justify-center gap-4 pb-4">
              <p className="text-center text-sm text-gray-600">
                Or Sign In Using
              </p>
              <div className="flex items-center justify-center gap-4">
                {signInMethods.map((method) => (
                  <Link
                    key={method.id}
                    href={method.href}
                    className="font-bold text-black hover:opacity-60"
                  >
                    <FontAwesomeIcon icon={method.icon} className="text-3xl" />
                  </Link>
                ))}
              </div>
            </div>
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
    </div>
  );
}
