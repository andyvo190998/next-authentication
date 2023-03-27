/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: true,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  reactStrictMode: true,
};
module.exports = nextConfig;
