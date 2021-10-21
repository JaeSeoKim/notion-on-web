import React from "react"
import { RichTextType } from "../../../lib/util/notion/types"
import Text from "../Text"

export interface CaptionProps {
  caption: RichTextType[]
  block_id: string
}

const Caption: React.FC<CaptionProps> = ({ caption, block_id }) => {
  if (caption.length === 0) {
    return null
  }

  return (
    <div className={`notion-caption`}>
      <Text rich_texts={caption} block_id={block_id} />
    </div>
  )
}

export default Caption
