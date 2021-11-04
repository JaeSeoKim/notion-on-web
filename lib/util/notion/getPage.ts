import { getPlaiceholder } from "plaiceholder"
import { notion } from "."
import getOpenGraph from "../getOpenGraph"
import getDatabase from "./getDatabase"
import { Block, GetBlockResponse } from "./types"

const getPage = async (id: string) => {
  const retrieve = async () => {
    return await notion.pages.retrieve({
      page_id: id,
    })
  }

  const getRecursiveChildren = async (block: GetBlockResponse) => {
    if (block.type === "image" && block.image.type === "file") {
      const { base64 } = await getPlaiceholder(block.image.file.url, {
        size: 10,
      })
      return {
        ...block,
        image: {
          ...block.image,
          file: {
            ...block.image.file,
            blurDataURL: base64,
          },
        },
      }
    }

    if (block.type === "child_page") {
      return {
        ...block,
        child_page: {
          ...block.child_page,
          retrieve: await notion.pages.retrieve({
            page_id: block.id,
          }),
        },
      }
    }

    if (block.type === "child_database") {
      try {
        return {
          ...block,
          child_database: {
            ...block.child_database,
            ...(await getDatabase(block.id)),
          },
        }
      } catch (_error) {
        // TODO: linked database 결과 처리 방법 생각 하기
        return block
      }
    }

    if (block.type === "bookmark") {
      try {
        return {
          ...block,
          bookmark: {
            ...block.bookmark,
            opengraph: await getOpenGraph({ url: block.bookmark.url }),
          },
        }
      } catch {
        console.log(`OpenGraph fetch fail : ${block.id}, ${block.bookmark.url}`)
        return {
          ...block,
          bookmark: {
            ...block.bookmark,
            opengraph: {
              url: null,
              title: null,
              publisher: null,
              description: null,
              image: null,
              logo: null,
            },
          },
        }
      }
    }

    if (!block.has_children) {
      return block
    }

    return {
      ...block,
      children: await children(block.id),
    }
  }

  const children = async (id: string, cursor?: string): Promise<Block[]> => {
    const { has_more, next_cursor, results } =
      await notion.blocks.children.list({
        block_id: id,
        page_size: 100,
        start_cursor: cursor,
      })
    if (!has_more || !next_cursor) {
      return (await Promise.all(
        results.map((block) => getRecursiveChildren(block))
      )) as Block[]
    }

    const [prev, next] = (await Promise.all([
      Promise.all(results.map((block) => getRecursiveChildren(block))),
      children(id, next_cursor),
    ])) as [Block[], Block[]]

    return [...prev, ...next]
  }

  const [info, data] = await Promise.all([retrieve(), children(id)])

  return {
    info: info,
    data: data,
  }
}

export default getPage
