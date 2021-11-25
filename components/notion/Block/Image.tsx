import React, { useEffect, useRef } from "react"
import { ImageBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import mediumZoom from "medium-zoom"

export interface ImageProps {
  block: ImageBlock
}

const ImageBlock: React.FC<ImageProps> = ({ block }) => {
  const getImageName = (uri: string) => {
    const encodeFileName = new URL(uri).pathname.split("/").pop()
    return encodeFileName ? decodeURI(encodeFileName) : `image-${block.id}`
  }

  const ZoomImg: React.FC<{
    src: string
    alt: string
  }> = ({ src, alt }) => {
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
      if (imgRef.current) {
        mediumZoom(imgRef.current)
      }
    }, [])

    return (
      <img
        ref={imgRef}
        className={`notion-image`}
        alt={alt}
        loading={"lazy"}
        src={src}
      />
    )
  }

  const NotionImage: React.FC<{
    block_id: string
    src: string
  }> = ({ block_id, src }) => {
    const url = new URL(src)
    const imageSrc = `/api/image/${encodeURIComponent(
      `${url.origin}${url.pathname}`
    )}?block_id=${block_id}`
    return <ZoomImg alt={getImageName(src)} src={imageSrc} />
  }

  return (
    <>
      {block.image.type === "external" ? (
        <ZoomImg
          src={block.image.external.url}
          alt={getImageName(block.image.external.url)}
        />
      ) : (
        <NotionImage block_id={block.id} src={block.image.file.url} />
      )}
      <Caption caption={block.image.caption} block_id={block.id} />
    </>
  )
}

export default ImageBlock
