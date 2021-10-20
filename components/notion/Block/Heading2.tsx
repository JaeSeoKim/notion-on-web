import cs from "classnames"
import React from "react"
import { Heading2Block } from "lib/util/notion/types"
import Text from "../Text"
import Blocks from "./Blocks"

export interface Heading2Props {
  block: Heading2Block
  index?: number
}

const Heading2: React.FC<Heading2Props> = ({ block, index }) => {
  const style =
    index === 0
      ? {
          marginTop: "4px",
        }
      : {}

  return (
    <>
      <h2 className={cs(["notion-heading_2"])} style={style}>
        <Text rich_texts={block.heading_2.text} block_id={block.id} />
      </h2>
      {block.children && <Blocks parentId={block.id} blocks={block.children} />}
    </>
  )
}

export default Heading2
