import metascraper from "metascraper"
import metascraperUrl from "metascraper-url"
import metascraperTitle from "metascraper-title"
import metascraperPublisher from "metascraper-publisher"
import metascraperDescription from "metascraper-description"
import metascraperImage from "metascraper-image"
import metascraperLogo from "metascraper-logo"
import metascraperLogoFavicon from "metascraper-logo-favicon"
import { PromiseType } from "utility-types"
import got from "got"

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
  const { url: requestURL, body } = await got(url)

  const results = await metaScraper({
    url: requestURL,
    html: body,
  })
  return results
}

export type OpenGraphType = PromiseType<ReturnType<typeof getOpenGraph>>

export default getOpenGraph
