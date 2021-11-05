import React, { useEffect, useRef } from "react"
import { ImageBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import useFileSrc from "../../../lib/hooks/useFileSrc"
import mediumZoom from "medium-zoom"

export interface ImageProps {
  block: ImageBlock
}

const Image: React.FC<ImageProps> = ({ block }) => {
  const getImageName = (uri: string) => {
    const slice_path = uri.split("?")[0].split("/")

    const encodeFileName = slice_path[slice_path.length - 1]

    return encodeFileName === ""
      ? `image-${block.id}`
      : decodeURI(encodeFileName)
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
    alt: string
    placeHolder: string
  }> = ({ block_id, alt, placeHolder }) => {
    const { data } = useFileSrc(block_id)

    return <ZoomImg alt={alt} src={data ? data.src : placeHolder} />
  }

  return (
    <>
      {block.image.type === "external" ? (
        <ZoomImg
          src={block.image.external.url}
          alt={getImageName(block.image.external.url)}
        />
      ) : (
        <NotionImage
          block_id={block.id}
          alt={getImageName(block.image.file.url)}
          placeHolder={block.image.file.blurDataURL}
        />
      )}
      <Caption caption={block.image.caption} block_id={block.id} />
    </>
  )
}

export default Image
