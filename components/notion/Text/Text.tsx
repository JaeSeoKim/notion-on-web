import React from "react"
import RichText from "./RichText"
import { RichTextType } from "../../../lib/util/notion/types"

export interface TextProps {
  rich_texts: RichTextType[]
  block_id: string
}

const Text: React.FC<TextProps> = ({ rich_texts, block_id }) => {
  return (
    <div className={`notion-text`}>
      {rich_texts.map((t, index) => (
        <RichText
          key={`${block_id}-t-${JSON.stringify(t)}-${index}`}
          rich_text={t}
        />
      ))}
    </div>
  )
}

export default Text
