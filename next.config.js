// next.config.js
/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

module.exports = withLess({
  reactStrictMode: false,
  images: {
    domains: [
      "cdn.discordapp.com",
      "lh3.googleusercontent.com",
      "media.graphcms.com",
    ],
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve("react").replace("index.js", ""),
    };

    return config;
  },
});
