import React from "react"
import { ImageBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import useFileSrc from "../../../lib/hooks/useFileSrc"
import "react-medium-image-zoom/dist/styles.css"
import Zoom from "react-medium-image-zoom"

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

  const NotionImage: React.FC<{
    block_id: string
    alt: string
    placeHolder: string
  }> = ({ block_id, alt, placeHolder }) => {
    const { data } = useFileSrc(block_id)

    return (
      <img
        className={`notion-image`}
        alt={alt}
        loading={"lazy"}
        src={data ? data.src : placeHolder}
      />
    )
  }

  return (
    <>
      <Zoom
        wrapStyle={{
          width: "100%",
        }}
      >
        {block.image.type === "external" ? (
          <img
            loading={"lazy"}
            className={`notion-image`}
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
      </Zoom>
      <Caption caption={block.image.caption} block_id={block.id} />
    </>
  )
}

export default Image
