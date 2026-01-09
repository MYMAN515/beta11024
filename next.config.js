/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true, // يساعد في تحميل الصور المحلية بدون مشاكل
  },
}

module.exports = nextConfig
