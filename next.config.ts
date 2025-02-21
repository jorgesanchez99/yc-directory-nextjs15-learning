import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'placehold.co',
      // },
    ],
  },
  experimental: {
    ppr : 'incremental',
  },
  devIndicators: {
      position : 'bottom-right',
  }
};

export default nextConfig;
