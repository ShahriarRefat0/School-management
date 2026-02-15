import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // other config options here

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hostnames
      },
      {
        protocol: "http",
        hostname: "**", // allow all http hostnames
      },
    ],
  },
};

export default nextConfig;
