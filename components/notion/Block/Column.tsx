import React from "react"
import { ColumnBlock } from "../../../lib/util/notion/types"
import Blocks from "./Blocks"

export interface ColumnPorps {
  block: ColumnBlock
}

const Column: React.FC<ColumnPorps> = ({ block }) => {
  return (
    <div className={`notion-column`}>
      <Blocks blocks={block.children} parentId={block.id} />
    </div>
  )
}

export default Column
