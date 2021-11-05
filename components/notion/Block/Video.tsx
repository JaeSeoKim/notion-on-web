import React from "react"
import { VideoBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import useFileSrc from "../../../lib/hooks/useFileSrc"
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
    // TODO: Error시 보여질 화면 구상 필요
    const style = (() => {
      if (!src) {
        return {
          cursor: "wait",
        }
      }
      return {}
    })()

    return (
      <video
        className={`notion-video`}
        preload={`metadata`}
        style={style}
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

  const VideoFile = () => {
    const { data } = useFileSrc(block.id)
    if (data) {
      return <VideoContainer src={data.src} />
    }

    return <VideoContainer />
  }

  return (
    <>
      {block.video.type === "external" ? (
        <ExternalVideo src={block.video.external.url} />
      ) : (
        <VideoFile />
      )}
      <Caption caption={block.video.caption} block_id={block.id} />
    </>
  )
}

export default Video
