const path = require("path")
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "components/**"),
    ],
  },
  experimental: {
    swcMinify: true,
  },
}
