import React from "react"
import Block from "."
import { Block as BlockType } from "../../../lib/util/notion/types"

export interface BlocksProps {
  parentId: string
  blocks: BlockType[]
}

const Blocks: React.FC<BlocksProps> = ({ blocks, parentId }) => {
  return (
    <>
      {blocks.map((block) => (
        <Block key={`p${parentId}-c${block.id}`} block={block} />
      ))}
    </>
  )
}

export default Blocks
