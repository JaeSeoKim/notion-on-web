import { notion } from "."
import PromiseAllSeteldJoin from "../PromiseAllSeteldJoin"
import { getDatabaseQuery } from "./getDatabase"
import { Block, GetBlockResponse } from "./types"

const getPage = async (id: string) => {
  const retrieve = async () => {
    return await notion.pages.retrieve({
      page_id: id,
    })
  }

  const getRecursiveChildren = async (block: GetBlockResponse) => {
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

    if (block.type === "synced_block") {
      return {
        ...block,
        children: await children(
          block.synced_block.synced_from
            ? block.synced_block.synced_from.block_id
            : block.id
        ),
      }
    }

    if (block.type === "link_to_page") {
      return {
        ...block,
        link_to_page: {
          ...block.link_to_page,
          retrieve: await notion.pages.retrieve({
            page_id:
              block.link_to_page.type === "page_id"
                ? block.link_to_page.page_id
                : block.link_to_page.database_id,
          }),
        },
      }
    }

    if (block.type === "child_database") {
      return {
        ...block,
        child_database: {
          ...block.child_database,
          query: await getDatabaseQuery(block.id),
        },
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
      return await PromiseAllSeteldJoin(
        results.map((block) => getRecursiveChildren(block))
      )
    }

    const blocks = await PromiseAllSeteldJoin([
      PromiseAllSeteldJoin(results.map((block) => getRecursiveChildren(block))),
      children(id, next_cursor),
    ])

    return [].concat(...blocks)
  }

  const [info, data] = await Promise.all([retrieve(), children(id)])

  return {
    retrieve: info,
    children: data,
  }
}

export default getPage
