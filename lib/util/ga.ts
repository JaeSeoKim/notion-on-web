import { googleAnalyticsTrackingId } from "./config"

// log the pageview with their URL
export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag("config", googleAnalyticsTrackingId, {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({ action, params }: { action: string; params: any }) => {
  // @ts-ignore
  window.gtag("event", action, params)
}
