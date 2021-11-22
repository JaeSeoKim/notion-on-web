import React from "react"
import { CalloutBlock } from "../../../lib/util/notion/types"
import Emoji from "../Emoji"
import Text from "../Text"
import Blocks from "./Blocks"

export interface CalloutProps {
  block: CalloutBlock
}

const Callout: React.FC<CalloutProps> = ({ block }) => {
  return (
    <div className={`notion-callout`}>
      <div className={`notion-callout_content`}>
        <div className={`notion-callout_emoji`}>
          <Emoji emoji={block.callout.icon} block_id={block.id} />
        </div>
        <div className={`notion-callout_text`}>
          <Text block_id={block.id} rich_texts={block.callout.text} />
          {block.children && (
            <Blocks blocks={block.children} parentId={block.id} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Callout
