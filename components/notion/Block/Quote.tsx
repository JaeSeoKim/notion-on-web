import React from "react"
import { QuoteBlock } from "../../../lib/util/notion/types"
import Text from "../Text"
import Blocks from "./Blocks"

export interface QuoteProps {
  block: QuoteBlock
}

const Quote: React.FC<QuoteProps> = ({ block }) => {
  return (
    <div className={`notion-quote`}>
      <Text rich_texts={block.quote.text} block_id={block.id} />
      {block.children && <Blocks blocks={block.children} parentId={block.id} />}
    </div>
  )
}

export default Quote
