// next.config.js
const withLess = require("next-with-less");

module.exports = withLess({
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'lh3.googleusercontent.com'],
  },
  lessLoaderOptions: {
    /* ... */
    javascriptEnabled: true,
  },
});