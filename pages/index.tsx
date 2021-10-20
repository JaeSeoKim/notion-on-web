import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import classNames from "classnames"
import getPage from "../lib/util/notion/getPage"
import Blocks from "../components/notion/Block/Blocks"

export const getStaticProps = async (_ctx: GetStaticPropsContext) => {
  const { data, info } = await getPage("13cb8d2d3328425e815a1896267f5906")
  return {
    props: {
      page: info,
      blocks: data,
    },
    revalidate: 64,
  }
}

const indexPage = ({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <article
        className={classNames(["notion", "mx-auto", "max-w-3xl", "w-full"])}
      >
        <Blocks parentId={page.id} blocks={blocks} />
      </article>
    </>
  )
}

export default indexPage
