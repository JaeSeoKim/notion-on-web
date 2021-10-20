import rawSiteConfig from "site.config"

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.js`)
}

export const htmlLang: string = rawSiteConfig["htmlLang"] || "en"
export const googleAnalyticsTrackingId: string | null =
  rawSiteConfig["googleAnalyticsTrackingId"] || null
