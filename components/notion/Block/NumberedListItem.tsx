import React, { useContext } from "react"
import { NumberedListItemBlock } from "lib/util/notion/types"
import Text from "../Text"
import Blocks, { BlocksContext } from "./Blocks"
import { convertToRoman, convertToAlpha } from "lib/util/numberConvert"

export interface NumberedListItemProps {
  block: NumberedListItemBlock
}

const NumberedListItem: React.FC<NumberedListItemProps> = ({ block }) => {
  const { getDeps, getIndex } = useContext(BlocksContext)

  const index = (() => {
    const index = getIndex()
    switch (getDeps() % 3) {
      case 1:
        return index
      case 2:
        return convertToAlpha(index)
      default:
        return convertToRoman(index)
    }
  })()

  return (
    <>
      <div className={`notion-numbered_list`}>
        <div className={`notion-numbered_list-index`}>{index}.</div>
        <div className={`notion-numbered_list-content`}>
          <Text
            rich_texts={block.numbered_list_item.text}
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

export default NumberedListItem
