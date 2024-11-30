/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://copper-electronic-chimpanzee-583.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
