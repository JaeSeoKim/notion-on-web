import React from "react"
import { AudioBlock } from "lib/util/notion/types"
import Children from "./Children"
import Caption from "./Caption"
import useRequest from "lib/hooks/useRequest"
import { GetFileSuccessType } from "pages/api/file/[block_id]"
import useFileSrc from "../../../lib/hooks/useFileSrc"

export interface AudioProps {
  block: AudioBlock
}

const Audio: React.FC<AudioProps> = ({ block }) => {
  const ExternalAudio: React.FC<{ src: string }> = ({ src }) => {
    return (
      <audio
        preload={"none"}
        className={`notion-audio`}
        controls
        src={src}
      ></audio>
    )
  }

  const FileAudio = () => {
    const { data } = useFileSrc(block.id)

    const style = (() => {
      if (!data) {
        return {
          cursor: "wait",
        }
      }
      return {}
    })()

    return (
      <audio
        className={`notion-audio`}
        style={style}
        controls
        src={data ? data.src : undefined}
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
      {block.children && (
        <Children blocks={block.children} parentId={block.id} />
      )}
    </>
  )
}

export default Audio
