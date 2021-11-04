import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import classNames from "classnames"
import getPage from "../lib/util/notion/getPage"
import Blocks from "../components/notion/Block/Blocks"

export const getStaticProps = async (_ctx: GetStaticPropsContext) => {
  const { data, info } = await getPage("63ddded3f0614770b4157439bb79f926")
  return {
    props: {
      page: info,
      blocks: data,
    },
    revalidate: 24 * 60 * 64 /* 1 hour */,
  }
}

const indexPage = ({
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

export default indexPage
