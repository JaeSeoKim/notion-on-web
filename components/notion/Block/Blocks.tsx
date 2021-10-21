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
      {blocks.map((block, index) => (
        <Block key={`p${parentId}__c${block.id}`} block={block} index={index} />
      ))}
    </>
  )
}

export default Blocks
