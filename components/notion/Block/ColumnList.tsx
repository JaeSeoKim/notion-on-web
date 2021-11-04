import React from "react"
import { ColumnListBlock } from "../../../lib/util/notion/types"
import Blocks from "./Blocks"

export interface ColumnListPorps {
  block: ColumnListBlock
}

const ColumnList: React.FC<ColumnListPorps> = ({ block }) => {
  return (
    <div className={`notion-column_list`}>
      <Blocks blocks={block.children} parentId={block.id} />
    </div>
  )
}

export default ColumnList
