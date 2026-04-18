import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/experience",
        permanent: false,
      },
      {
        source: "/qb-translation",
        destination: "/projects/qb-translation",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
