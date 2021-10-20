import cs from "classnames"
import React from "react"
import { Heading1Block } from "lib/util/notion/types"
import Text from "./Text"
import Blocks from "./Blocks"

export interface Heading1Props {
  block: Heading1Block
}

const Heading1: React.FC<Heading1Props> = ({ block }) => {
  return (
    <>
      <h1 className={cs(["notion-heading_1"])}>
        <Text rich_texts={block.heading_1.text} block_id={block.id} />
      </h1>
      {block.children && <Blocks parentId={block.id} blocks={block.children} />}
    </>
  )
}

export default Heading1
