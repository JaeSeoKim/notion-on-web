import React from "react"
import { Block } from "../../../lib/util/notion/types"
import Blocks from "./Blocks"

export interface ChildrenProps {
  blocks: Block[]
  parentId: string
}

const Children: React.FC<ChildrenProps> = ({ blocks, parentId }) => {
  return (
    <div className={`notion-children`}>
      <Blocks blocks={blocks} parentId={parentId} />
    </div>
  )
}

export default Children
