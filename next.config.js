/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    localeDetection: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
