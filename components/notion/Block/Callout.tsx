import React from "react"
import { CalloutBlock } from "../../../lib/util/notion/types"
import Emoji from "../Emoji"
import Text from "../Text"

export interface CalloutProps {
  block: CalloutBlock
}

const Callout: React.FC<CalloutProps> = ({ block }) => {
  return (
    <div className={`notion-callout`}>
      <div>
        <div>
          <Emoji emoji={block.callout.icon} />
        </div>
        <Text block_id={block.id} rich_texts={block.callout.text} />
      </div>
    </div>
  )
}

export default Callout
