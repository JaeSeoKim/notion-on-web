import cs from "classnames"
import React from "react"
import { Heading1Block } from "lib/util/notion/types"
import Text from "../Text"
import Children from "./Children"

export interface Heading1Props {
  block: Heading1Block
  index?: number
}

const Heading1: React.FC<Heading1Props> = ({ block, index }) => {
  const style =
    index === 0
      ? {
          marginTop: "4px",
        }
      : {}

  return (
    <>
      <h1 className={cs(["notion-heading_1"])} style={style}>
        <Text rich_texts={block.heading_1.text} block_id={block.id} />
      </h1>
      {block.children && (
        <Children parentId={block.id} blocks={block.children} />
      )}
    </>
  )
}

export default Heading1
