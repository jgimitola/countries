/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flagcdn.com', 'upload.wikimedia.org'],
  },
  compiler: {
    ...(process.env.NODE_ENV === 'production' && {
      removeConsole: {
        exclude: ['error'],
      },
    }),
  },
};

module.exports = nextConfig;
