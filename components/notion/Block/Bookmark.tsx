/* eslint-disable @next/next/no-img-element */
import React from "react"
import { BookmarkBlock } from "lib/util/notion/types"
import Caption from "./Caption"

export interface BookmarkProps {
  block: BookmarkBlock
}

const getHostname = (url: string) => {
  return new URL(url).hostname
}

const Bookmark: React.FC<BookmarkProps> = ({ block }) => {
  const Bookmark: React.FC<BookmarkProps> = ({ block }) => {
    const opengraph = block.bookmark.opengraph

    return (
      <>
        <div className={`notion-bookmark_info`}>
          <div className={`notion-bookmark_title`}>
            {opengraph.title
              ? opengraph.title
              : getHostname(block.bookmark.url)}
          </div>
          {opengraph.description && (
            <div className={`notion-bookmark_description`}>
              {opengraph.description}
            </div>
          )}
          <div className={`notion-bookmark_target`}>
            {opengraph.logo && (
              <img
                className={`notion-bookmark_target_pavicon`}
                src={opengraph.logo}
                alt={`${opengraph.url} logo`}
              />
            )}
            <div className={`notion-bookmark_target_url`}>
              {opengraph.url ? opengraph.url : block.bookmark.url}
            </div>
          </div>
        </div>
        {opengraph.image && (
          <div className={`notion-bookmark_image`}>
            <div style={{ position: "absolute", inset: "0px" }}>
              <img
                src={opengraph.image}
                alt={`${opengraph.url} image`}
                style={{
                  objectFit: "cover",
                  borderRadius: "1px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <a
        href={block.bookmark.url}
        target={"_blank"}
        rel="noreferrer"
        className={`notion-bookmark`}
      >
        <Bookmark block={block} />
      </a>
      <Caption caption={block.bookmark.caption} block_id={block.id} />
    </>
  )
}

export default Bookmark
