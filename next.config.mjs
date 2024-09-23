/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.HOSTNAME || "localhost:3000",
      },
    ],
  },
};

export default nextConfig;
