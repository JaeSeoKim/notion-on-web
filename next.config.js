const path = require("path")
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "components/**"),
    ],
  },
  images: {
    domains: [],
  },
  experimental: {
    staticPageGenerationTimeout: 60,
  },
}
