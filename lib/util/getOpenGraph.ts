import metascraper from "metascraper"
import metascraperUrl from "metascraper-url"
import metascraperTitle from "metascraper-title"
import metascraperPublisher from "metascraper-publisher"
import metascraperDescription from "metascraper-description"
import metascraperImage from "metascraper-image"
import metascraperLogo from "metascraper-logo"
import metascraperLogoFavicon from "metascraper-logo-favicon"
import got from "got"

const metaScraper = metascraper([
  metascraperUrl(),
  metascraperTitle(),
  metascraperPublisher(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogoFavicon(),
  metascraperLogo(),
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
  /**
   * metaScraper의 반환 Type이 정확하지 않음.
   */
  return results as unknown as OpenGraphType
}

type OpenGraphKey =
  | "url"
  | "title"
  | "publisher"
  | "description"
  | "image"
  | "logo"

export declare type OpenGraphType = Record<OpenGraphKey, string | null>

export default getOpenGraph
