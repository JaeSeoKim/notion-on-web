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
  images: {
    domains: [],
    dangerouslyAllowAllDomains: true,
  },
  experimental: {
    staticPageGenerationTimeout: 60,
  },
}
