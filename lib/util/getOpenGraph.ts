import metascraper from "metascraper"
import metascraperUrl from "metascraper-url"
import metascraperTitle from "metascraper-title"
import metascraperPublisher from "metascraper-publisher"
import metascraperDescription from "metascraper-description"
import metascraperImage from "metascraper-image"
import metascraperLogo from "metascraper-logo"
import metascraperLogoFavicon from "metascraper-logo-favicon"
import puppeteer from "puppeteer"
import { PromiseType } from "utility-types"

const metaScraper = metascraper([
  metascraperUrl(),
  metascraperTitle(),
  metascraperPublisher(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
  metascraperLogoFavicon(),
])

export interface getOpenGraphProps {
  url: string
}

const getOpenGraph = async ({ url }: getOpenGraphProps) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: "networkidle2",
  })

  const html = await page.content()

  await browser.close()

  const results = await metaScraper({
    url: url,
    html: html,
  })
  return results
}

export type OpenGraphType = PromiseType<ReturnType<typeof getOpenGraph>>

export default getOpenGraph
