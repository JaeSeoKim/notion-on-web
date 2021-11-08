import cs from "classnames"
import React from "react"
import CheckBoxIcon from "../../icon/CheckBoxIcon"
import { ToDoBlock } from "lib/util/notion/types"
import Text from "../Text"
import Children from "./Children"

export interface ToDoProps {
  block: ToDoBlock
}

const ToDo: React.FC<ToDoProps> = ({ block }) => {
  return (
    <>
      <div className={cs("notion-to_do")}>
        <div className={`notion-to_do_checkbox`}>
          <CheckBoxIcon checked={block.to_do.checked} />
        </div>
        <div className={cs(block.to_do.checked && "notion-to_do_checked")}>
          <Text rich_texts={block.to_do.text} block_id={block.id} />
        </div>
      </div>
      {block.children && (
        <Children blocks={block.children} parentId={block.id} />
      )}
    </>
  )
}

export default ToDo
