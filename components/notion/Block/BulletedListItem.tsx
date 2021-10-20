import React from "react"
import { BulletedListItemBlock } from "lib/util/notion/types"
import Text from "../Text"
import Blocks from "./Blocks"

export interface BulletedListItemProps {
  block: BulletedListItemBlock
}

const BulletedListItem: React.FC<BulletedListItemProps> = ({ block }) => {
  return (
    <>
      <div className={`notion-bulleted_list-item`}>
        <div className={`pseudoSelection`}>
          <div className={`pseudoBefore`}></div>
        </div>
        <Text
          rich_texts={block.bulleted_list_item.text}
          block_id={block.id}
        ></Text>
      </div>
      {block.children && <Blocks parentId={block.id} blocks={block.children} />}
    </>
  )
}

export default BulletedListItem
