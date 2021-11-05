import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import classNames from "classnames"
import getPage from "../lib/util/notion/getPage"
import Blocks from "../components/notion/Block/Blocks"
import getDatabase from "../lib/util/notion/getDatabase"
import parseId from "../lib/util/notion/parseId"

const database_id = "b5a4fe321aa443c580b6744b76e46728"

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { page_id } = ctx.params as { page_id: string }

  try {
    const { data, info } = await getPage(page_id)
    return {
      props: {
        page: info,
        blocks: data,
      },
      revalidate: 24 * 60 * 64 /* 1 hour */,
    }
  } catch (error) {
    console.error("page error : ", page_id, error)
    throw error
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { query } = await getDatabase(database_id)

  const paths = query.map((block) => {
    return {
      params: {
        page_id: parseId(block.id),
      },
    }
  })

  return {
    paths: paths,
    fallback: "blocking",
  }
}

const Page = ({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <article
        className={classNames([
          "notion-page",
          "mx-auto",
          "max-w-screen-md",
          "w-full",
        ])}
      >
        <Blocks parentId={page.id} blocks={blocks} />
      </article>
    </>
  )
}

export default Page
