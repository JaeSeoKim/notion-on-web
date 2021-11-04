import React from "react"
import { VideoBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import urlParser from "js-video-url-parser/lib/base"
import "js-video-url-parser/lib/provider/vimeo"
import "js-video-url-parser/lib/provider/youtube"
import YouTube from "react-youtube"
import Vimeo from "@u-wave/react-vimeo"

export interface VideoProps {
  block: VideoBlock
}

const Video: React.FC<VideoProps> = ({ block }) => {
  const VideoContainer: React.FC<{
    src?: string
  }> = ({ src }) => {
    return (
      <video
        className={`notion-video`}
        preload={`metadata`}
        src={src}
        controls
      ></video>
    )
  }

  const ExternalVideo: React.FC<{ src: string }> = ({ src }) => {
    const info = urlParser.parse(src)
    if (info?.provider === "youtube") {
      return (
        <YouTube
          videoId={info.id}
          className={`notion-video`}
          opts={info.params}
        />
      )
    }
    if (info?.provider === "vimeo") {
      return (
        <Vimeo video={info.id} className={`notion-video notion-video_vimeo`} />
      )
    }

    return <VideoContainer src={src} />
  }

  return (
    <>
      {block.video.type === "external" ? (
        <ExternalVideo src={block.video.external.url} />
      ) : (
        <VideoContainer src={`/api/file/${block.id}`} />
      )}
      <Caption caption={block.video.caption} block_id={block.id} />
    </>
  )
}

export default Video
