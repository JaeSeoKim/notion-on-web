import React from "react"
import { NumberedListItemBlock } from "lib/util/notion/types"
import Text from "../Text"

export interface NumberedListItemProps {
  block: NumberedListItemBlock
}

const NumberedListItem: React.FC<NumberedListItemProps> = ({ block }) => {
  return (
    <div className={`notion-bulleted_list-item`}>
      <div className={`pseudoSelection`}>
        <div
          className={`pseudoBefore`}
          style={{
            // @ts-ignore
            "--pseudoBefore--content": "'1.'",
            fontSize: "1em",
          }}
        >
          {" "}
        </div>
      </div>
      <Text
        rich_texts={block.numbered_list_item.text}
        block_id={block.id}
      ></Text>
    </div>
  )
}

export default NumberedListItem
