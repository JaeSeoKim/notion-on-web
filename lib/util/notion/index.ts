import { Client } from "@notionhq/client"

if (!process.env.NOTION_ACCESS_TOKEN) {
  throw new Error(`Config error: invalid NOTION_ACCESS_TOKEN`)
}

export const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})
