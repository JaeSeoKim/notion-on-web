import { GetServerSideProps } from "next"
import { renderSiteMap, siteMapUrlType } from "lib/util/sitemap"
import parseId from "lib/util/notion/parseId"
import getDatabase from "lib/util/notion/getDatabase"

const host = "https://localhost:3000"

const database_id = "b5a4fe321aa443c580b6744b76e46728"

const MAX_AGE = 60 * 60 * 12 // 12 hour

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.method !== "GET") {
    res.statusCode = 405
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify({ error: "method not allowed" }))
    res.end()
    return { props: {} }
  }

  try {
    const { query, retrieve } = await getDatabase(database_id)

    const urls: siteMapUrlType[] = query.map((block) => {
      return {
        loc: `${host}/${parseId(block.id)}`,
        lastmod: block.last_edited_time,
      }
    })

    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${MAX_AGE}, max-age=${MAX_AGE}, stale-while-revalidate=${MAX_AGE}`
    )
    res.setHeader("Content-Type", "text/xml")
    res.write(
      renderSiteMap([
        {
          loc: host,
          lastmod: retrieve.last_edited_time,
          changefreq: "daily",
        },
        ...urls,
      ])
    )
  } catch (error: any) {
    res.statusCode = 504
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify({ error: "internal server error" }))
  }
  res.end()
  return { props: {} }
}

const SiteMapXml: React.FC = () => null

export default SiteMapXml
