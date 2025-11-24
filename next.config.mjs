/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // 👈 أوقف Turbopack
  },
  reactCompiler: true, // لو عايز تسيبه شغال سيبه، مفيش مشكلة
};

export default nextConfig;
