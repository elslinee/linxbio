"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faPinterest,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faChevronDown,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/client/auth";
export default function Home() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  console.log(user);
  const logoutRequest = async () => {
    try {
      await logout();

      useAuthStore.getState().clearUser();

      router.push("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  return (
    <div className="selection:bg-primary min-h-screen bg-white font-sans text-black selection:text-black">
      <header className="cont flex h-18 w-full items-center justify-between py-4">
        <div className="">
          <Image src={"/logo-nowall.png"} width={100} height={22} alt="logo" />
        </div>
        <nav className="flex items-center gap-6">
          {loading ? (
            ""
          ) : (
            <>
              {" "}
              {user ? (
                <Link
                  onClick={logoutRequest}
                  href="/dashboard"
                  className="text-sm font-bold hover:underline"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={`text-sm font-bold hover:underline`}
                >
                  Log in
                </Link>
              )}
            </>
          )}

          <Link
            href="/register"
            className="hover:bg-primary rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition-colors hover:text-black"
          >
            Start Now
          </Link>
        </nav>
      </header>
      <main className="mx-auto flex flex-col items-center justify-between gap-12 px-6 pt-12 pb-20 lg:flex-row lg:gap-20 lg:px-24 lg:pt-24 lg:pb-32">
        <div className="max-w-2xl flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-5xl leading-[1.1] font-black tracking-tight lg:text-7xl">
            One Smart Link for <br />
            <span className="font-serif italic">Everything</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg leading-relaxed text-gray-600 lg:mx-0">
            Transform your link-in-bio into a smart hub for your work, products,
            and presence
          </p>
          <div>
            <Link href="/register">
              <button className="bg-primary shadow-primary/20 cursor-pointer rounded-full px-8 py-4 text-lg font-bold text-black shadow-lg transition-all hover:scale-95 hover:opacity-90">
                Start Now
              </button>
            </Link>
          </div>
        </div>

        <div className="relative flex w-full max-w-md flex-1 justify-center lg:max-w-lg">
          <div className="absolute top-1/4 -left-4 z-10 flex animate-bounce cursor-pointer items-center gap-3 rounded-xl bg-white p-3 shadow-xl lg:-left-12">
            <div className="text-xs font-bold">Try it</div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>

          <div className="relative h-[600px] w-[300px] rounded-[3rem] border-4 border-gray-800 bg-gray-900 p-[6px] shadow-2xl">
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-white">
              <div className="h-40 w-full bg-linear-to-b from-[#f4a8d4] to-[#ffffff]"></div>

              <div className="relative -mt-12 flex flex-col items-center px-6">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
                  <Image
                    src="/hero/hero-avatar.png"
                    alt="Profile"
                    width={100}
                    height={100}
                  />
                </div>

                <h2 className="mt-3 text-lg font-black tracking-wide text-black uppercase">
                  Johnny
                </h2>
                <p className="text-[10px] font-medium text-gray-500">
                  Content Creator
                </p>

                <div className="mt-4 flex gap-4 text-black">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="h-5 w-5 cursor-pointer hover:opacity-70"
                  />

                  <FontAwesomeIcon
                    icon={faTiktok}
                    className="h-5 w-5 cursor-pointer hover:opacity-70"
                  />

                  <FontAwesomeIcon
                    icon={faPinterest}
                    className="h-5 w-5 cursor-pointer hover:opacity-70"
                  />

                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="h-5 w-5 cursor-pointer hover:opacity-70"
                  />

                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="h-5 w-5 cursor-pointer hover:opacity-70"
                  />
                </div>

                <div className="mt-6 w-full space-y-3">
                  <button className="w-full rounded-full bg-[#EFEFA0] py-3 text-xs font-bold text-black shadow-sm transition-transform hover:scale-[1.02] hover:opacity-90">
                    LATEST VIDEOS
                  </button>
                  <button className="w-full rounded-full bg-[#EFEFA0] py-3 text-xs font-bold text-black shadow-sm transition-transform hover:scale-[1.02] hover:opacity-90">
                    TALK TO ME
                  </button>
                  <button className="flex w-full items-center justify-between rounded-full bg-[#EFEFA0] px-4 py-3 text-xs font-bold text-black shadow-sm transition-transform hover:scale-[1.02] hover:opacity-90">
                    <span className="flex-1 text-center">POWER MY CONTENT</span>
                    <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-1 flex-col rounded-t-4xl bg-[#D0E6F5] px-6 pt-6 pb-4">
                <h3 className="mb-4 text-center text-xs font-bold tracking-wider text-black uppercase">
                  My Links
                </h3>

                <div className="scrollbar-hide space-y-3 overflow-y-auto">
                  <div className="group flex h-12 cursor-pointer items-center gap-3 rounded-xl bg-white/60 p-2 px-4 transition-all hover:bg-white">
                    <span className="flex-1 text-sm font-bold text-black">
                      Blog
                    </span>
                    <FontAwesomeIcon
                      icon={faExternalLinkAlt}
                      className="h-4 w-4 text-black opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
