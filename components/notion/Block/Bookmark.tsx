import React from "react"
import { BookmarkBlock } from "lib/util/notion/types"
import Caption from "./Caption"

export interface BookmarkProps {
  block: BookmarkBlock
}

const Bookmark: React.FC<BookmarkProps> = ({ block }) => {
  return (
    <>
      <a href={block.bookmark.url} target={"_blank"} rel="noreferrer">
        <div className={`notion-bookmark`}>{block.bookmark.url}</div>
      </a>
      <Caption caption={block.bookmark.caption} block_id={block.id} />
    </>
  )
}

export default Bookmark
