import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints"
import { SetIntersection } from "utility-types"
import { notion } from "./index"
import { DatabasesQueryType } from "./types"

type options = Partial<
  SetIntersection<
    Required<QueryDatabaseParameters>,
    {
      filter: Object
      sorts: Object
    }
  >
>

export const getDatabaseQuery = async (
  id: string,
  { options, start_cursor }: { options?: options; start_cursor?: string } = {}
): Promise<DatabasesQueryType> => {
  const res = await notion.databases.query({
    ...options,
    database_id: id,
    page_size: 100,
    start_cursor: start_cursor,
  })

  if (!res.has_more || !res.next_cursor) {
    return res.results
  }
  return [
    ...res.results,
    ...(await getDatabaseQuery(id, { start_cursor: res.next_cursor })),
  ]
}

const getDatabase = async (id: string, options?: options) => {
  const retrieve = async () => {
    return await notion.databases.retrieve({
      database_id: id,
    })
  }

  const [retrieveResult, queryResult] = await Promise.all([
    retrieve(),
    getDatabaseQuery(id, { options }),
  ])

  return {
    retrieve: retrieveResult,
    query: queryResult,
  }
}

export default getDatabase
