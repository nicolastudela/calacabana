/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental:{ newNextLinkBehavior: trye },
  redirects() {
    return [
      process.env.MAINTENANCE_MODE === "1"
        ? { source: "/((?!maintenance).*)", destination: "/maintenance.html", permanent: false }
        : null,
    ].filter(Boolean);
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)