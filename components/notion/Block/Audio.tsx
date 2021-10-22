import React from "react"
import { AudioBlock } from "lib/util/notion/types"
import Children from "./Children"
import Caption from "./Caption"
import useRequest from "lib/util/useRequest"
import { GetFileSuccessType } from "pages/api/file/[block_id]"

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
    // TODO: Audio error, fetch 상태 표시 구현 필요
    const { data, error: _error } = useRequest<GetFileSuccessType>(
      {
        url: `/api/file/${block.id}`,
      },
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    )
    return (
      <audio
        preload={"none"}
        className={`notion-audio`}
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
