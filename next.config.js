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
    domains: [
      "s3.us-east-1.amazonaws.com",
      "s3.us-east-2.amazonaws.com",
      "s3.us-west-1.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "s3.ap-east-1.amazonaws.com",
      "s3.ap-south-1.amazonaws.com",
      "s3.ap-northeast-1.amazonaws.com",
      "s3.ap-northeast-2.amazonaws.com",
      "s3.ap-northeast-3.amazonaws.com",
      "s3.ap-southeast-1.amazonaws.com",
      "s3.ap-southeast-2.amazonaws.com",
      "s3.ca-central-1.amazonaws.com",
      "s3.eu-central-1.amazonaws.com",
      "s3.eu-west-1.amazonaws.com",
      "s3.eu-west-2.amazonaws.com",
      "s3.eu-west-3.amazonaws.com",
      "s3.eu-north-1.amazonaws.com",
      "s3.sa-east-1.amazonaws.com",
      "s3.me-south-1.amazonaws.com",
    ],
    dangerouslyAllowAllDomains: true,
  },
  experimental: {
    staticPageGenerationTimeout: 60,
  },
}
