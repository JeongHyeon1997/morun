/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@morun/shared', '@morun/tokens'],
  typedRoutes: true,
};

export default nextConfig;
