import React from "react"
import { EmbedBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"

export interface EmbedProps {
  block: EmbedBlock
}

const Embed: React.FC<EmbedProps> = ({ block }) => {
  return (
    <>
      <iframe
        src={block.embed.url}
        className={`notion-embed`}
        sandbox={`allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin`}
        allowFullScreen
        loading={`lazy`}
        frameBorder={0}
      />
      <Caption caption={block.embed.caption} block_id={block.id} />
    </>
  )
}

export default Embed
