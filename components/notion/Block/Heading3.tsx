import cs from "classnames"
import React from "react"
import { Heading3Block } from "lib/util/notion/types"
import Text from "../Text"
import Blocks from "./Blocks"

export interface Heading3Props {
  block: Heading3Block
  index?: number
}

const Heading3: React.FC<Heading3Props> = ({ block, index }) => {
  const style =
    index === 0
      ? {
          marginTop: "4px",
        }
      : {}

  return (
    <>
      <h3 className={cs(["notion-heading_3"])} style={style}>
        <Text rich_texts={block.heading_3.text} block_id={block.id} />
      </h3>
      {block.children && <Blocks parentId={block.id} blocks={block.children} />}
    </>
  )
}

export default Heading3
