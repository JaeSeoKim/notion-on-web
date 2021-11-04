import React, { useContext } from "react"
import { BulletedListItemBlock } from "lib/util/notion/types"
import Text from "../Text"
import Blocks, { BlocksContext } from "./Blocks"

export interface BulletedListItemProps {
  block: BulletedListItemBlock
}

const BulletedListItem: React.FC<BulletedListItemProps> = ({ block }) => {
  const { getDeps } = useContext(BlocksContext)

  const bulletStyle = (() => {
    switch (getDeps() % 3) {
      case 1:
        return "•"
      case 2:
        return "◦"
      default:
        return "▪"
    }
  })()

  return (
    <>
      <div className={`notion-bulleted_list`}>
        <div className={`notion-bulleted_list-index`}>{bulletStyle}</div>
        <div className={`notion-bulleted_list-content`}>
          <Text
            rich_texts={block.bulleted_list_item.text}
            block_id={block.id}
          ></Text>
          {block.children && (
            <Blocks parentId={block.id} blocks={block.children} />
          )}
        </div>
      </div>
    </>
  )
}

export default BulletedListItem
