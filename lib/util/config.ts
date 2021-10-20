import rawSiteConfig from "site.config"

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.js`)
}

export const htmlLang: string = rawSiteConfig["htmlLang"] || "en"
export const googleAnalyticsTrackingId: string | null =
  rawSiteConfig["googleAnalyticsTrackingId"] || null

export const isDev =
  process.env.NODE_ENV === "development" || !process.env.NODE_ENV
