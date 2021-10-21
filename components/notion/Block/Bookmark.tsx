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
        <div>
          <div>
            {opengraph.title
              ? opengraph.title
              : getHostname(block.bookmark.url)}
          </div>
          {opengraph.description ? (
            <div>{opengraph.description}</div>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
          <div>
            {opengraph.logo ? (
              <img src={opengraph.logo} alt={`${opengraph.url} logo`} />
            ) : (
              <div style={{ display: "none" }}></div>
            )}
            <div>{opengraph.url ? opengraph.url : block.bookmark.url}</div>
          </div>
        </div>
        {opengraph.image ? (
          <div>
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
        ) : (
          <div style={{ display: "none" }}></div>
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
