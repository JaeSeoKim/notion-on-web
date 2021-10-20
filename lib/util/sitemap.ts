export interface siteMapUrlType {
  loc: string
  /**
   * @see https://www.w3.org/TR/NOTE-datetime
   */
  lastmod?: string
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never"
  priority?: number
}

export const renderSiteMap = (urls: siteMapUrlType[]) => {
  const renderUrl = (url: siteMapUrlType) => {
    const escapeXmlLoc = url.loc
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")

    return [
      `<url>`,
      `<loc>${escapeXmlLoc}</loc>`,
      url.lastmod && `<lastmod>${url.lastmod}</lastmod>`,
      url.changefreq && `<changefreq>${url.changefreq}</changefreq>`,
      url.priority && `<priority>${url.priority}</priority>`,
      `</url>`,
    ]
      .filter(Boolean)
      .join("")
  }

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls.map((url) => renderUrl(url)),
    `</urlset>`,
  ].join("")
}
