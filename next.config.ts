import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/storage",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
