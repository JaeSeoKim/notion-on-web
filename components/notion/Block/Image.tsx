import React from "react"
import { default as NextImage } from "next/image"
import { ImageBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

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

  return (
    <>
      <Zoom>
        {block.image.type === "external" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={`notion-image`}
            src={block.image.external.url}
            alt={getImageName(block.image.external.url)}
          />
        ) : (
          <div className={`notion-image`}>
            <NextImage
              className={`notion-image-next`}
              alt={getImageName(block.image.file.url)}
              src={`/api/file/${block.id}`}
              blurDataURL={block.image.file.blurDataURL}
              placeholder={"blur"}
              layout={"fill"}
            />
          </div>
        )}
      </Zoom>
      <Caption caption={block.image.caption} block_id={block.id} />
    </>
  )
}

export default Image
