/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = (phase, nextConfig) => {
  return withBundleAnalyzer(nextConfig)
}