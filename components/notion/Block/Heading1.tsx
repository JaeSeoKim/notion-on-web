import Link from "next/link"
import cs from "classnames"
import React from "react"
import { Heading1Block } from "lib/util/notion/types"
import Text from "../Text"
import Children from "./Children"
import FileLinkIcon from "../../icon/FileLinkIcon"

export interface Heading1Props {
  block: Heading1Block
  index?: number
}

const Heading1: React.FC<Heading1Props> = ({ block, index }) => {
  const style = (() => {
    if (index === 0) {
      return {
        marginTop: "4px",
      }
    }
    return {}
  })()

  return (
    <>
      <h1 className={cs(["notion-heading_1"])} style={style} id={block.id}>
        <Link href={`#${block.id}`}>
          <a className={`notion-anchor`}>
            <FileLinkIcon />
          </a>
        </Link>
        <Text rich_texts={block.heading_1.text} block_id={block.id} />
      </h1>
      {block.children && (
        <Children parentId={block.id} blocks={block.children} />
      )}
    </>
  )
}

export default Heading1
