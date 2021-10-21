import React from "react"
import { AudioBlock } from "../../../lib/util/notion/types"
import Children from "./Children"
import Caption from "./Caption"

export interface AudioProps {
  block: AudioBlock
}

const Audio: React.FC<AudioProps> = ({ block }) => {
  const url = (() => {
    if (block.audio.type === "external") {
      return block.audio.external.url
    }
    return block.audio.file.url
  })()

  return (
    <>
      <audio className={`notion-audio`} controls src={url}></audio>
      <Caption caption={block.audio.caption} block_id={block.id} />
      {block.children && (
        <Children blocks={block.children} parentId={block.id} />
      )}
    </>
  )
}

export default Audio
