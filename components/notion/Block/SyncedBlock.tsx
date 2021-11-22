import React from "react"
import { SyncedBlockBlock } from "../../../lib/util/notion/types"
import Blocks from "./Blocks"

export interface SyncedBlockProps {
  block: SyncedBlockBlock
}

const SyncedBlock: React.FC<SyncedBlockProps> = ({ block }) => {
  if (!block.children) return null
  return <Blocks blocks={block.children} parentId={block.id} />
}

export default SyncedBlock
