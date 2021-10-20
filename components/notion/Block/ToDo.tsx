import cs from "classnames"
import React from "react"
import CheckBoxIcon from "../../icon/CheckBoxIcon"
import { ToDoBlock } from "lib/util/notion/types"
import Text from "./Text"

export interface ToDoProps {
  block: ToDoBlock
}

const ToDo: React.FC<ToDoProps> = ({ block }) => {
  return (
    <div className={cs(["notion-to_do"])}>
      <div className={`pseudoSelection`}>
        <CheckBoxIcon checked={block.to_do.checked} />
      </div>
      <Text rich_texts={block.to_do.text} block_id={block.id} />
    </div>
  )
}

export default ToDo
