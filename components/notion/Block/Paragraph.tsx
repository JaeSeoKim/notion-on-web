import cs from "classnames"
import React from "react"
import { ParagraphBlock } from "lib/util/notion/types"
import Text from "./Text"
import Blocks from "./Blocks"

export interface ParagraphProps {
  block: ParagraphBlock
}

const Paragraph: React.FC<ParagraphProps> = ({ block }) => {
  return (
    <>
      <Text rich_texts={block.paragraph.text} block_id={block.id} />
      {block.children && <Blocks parentId={block.id} blocks={block.children} />}
    </>
  )
}

export default Paragraph
