import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import classNames from "classnames"
import getPage from "../lib/util/notion/getPage"
import Blocks from "../components/notion/Block/Blocks"

export const getStaticProps = async (_ctx: GetStaticPropsContext) => {
  const { retrieve, children } = await getPage(
    "63ddded3f0614770b4157439bb79f926"
  )
  return {
    props: {
      retrieve,
      children,
    },
    revalidate: 60 /* 1 minute */,
  }
}

const indexPage = ({
  retrieve,
  children,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <article
        className={classNames([
          "notion-container",
          "mx-auto",
          "max-w-screen-md",
          "w-full",
        ])}
      >
        <Blocks parentId={retrieve.id} blocks={children} />
      </article>
    </>
  )
}

export default indexPage
