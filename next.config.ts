import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/leak-detection",
        destination: "/leak-detection",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
