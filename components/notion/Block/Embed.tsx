import React from "react"
import { EmbedBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"

export interface EmbedProps {
  block: EmbedBlock
}

const Embed: React.FC<EmbedProps> = ({ block }) => {
  return (
    <>
      <iframe src={block.embed.url} className={`notion-embed`} />
      <Caption caption={block.embed.caption} block_id={block.id} />
    </>
  )
}

export default Embed
