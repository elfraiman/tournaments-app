// next.config.js
const withLess = require("next-with-less");

module.exports = withLess({
  reactStrictMode: false,
  images: {
    domains: ['cdn.discordapp.com', 'lh3.googleusercontent.com', 'media.graphcms.com'],
  },
  lessLoaderOptions: {
    /* ... */
    javascriptEnabled: true,
  },
});