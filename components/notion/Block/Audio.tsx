import React from "react"
import { AudioBlock } from "lib/util/notion/types"
import Children from "./Children"
import Caption from "./Caption"

export interface AudioProps {
  block: AudioBlock
}

const Audio: React.FC<AudioProps> = ({ block }) => {
  const ExternalAudio: React.FC<{ src: string }> = ({ src }) => {
    return (
      <audio
        preload={"metadata"}
        className={`notion-audio`}
        controls
        src={src}
      ></audio>
    )
  }

  const FileAudio = () => {
    return (
      <audio
        className={`notion-audio`}
        preload={`metadata`}
        controls
        src={`/api/file/${block.id}`}
      ></audio>
    )
  }

  return (
    <>
      {block.audio.type === "external" ? (
        <ExternalAudio src={block.audio.external.url} />
      ) : (
        <FileAudio />
      )}
      <Caption caption={block.audio.caption} block_id={block.id} />
    </>
  )
}

export default Audio
