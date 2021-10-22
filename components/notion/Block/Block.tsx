import React from "react"
import { Block as BlockType } from "lib/util/notion/types"
import BulletedListItem from "./BulletedListItem"
import ChildPage from "./ChildPage"
import Heading1 from "./Heading1"
import Heading2 from "./Heading2"
import Heading3 from "./Heading3"
import NumberedListItem from "./NumberedListItem"
import Paragraph from "./Paragraph"
import ToDo from "./ToDo"
import Toggle from "./Toggle"
import Audio from "./Audio"
import Bookmark from "./Bookmark"
import File from "./File"

export interface BlockProps {
  block: BlockType
  index: number
}

const Block: React.FC<BlockProps> = ({ block, index }) => {
  const SwitchBlock: React.FC<BlockProps> = ({ block, index }) => {
    if (block.type === "paragraph") {
      return <Paragraph block={block} />
    }
    if (block.type === "heading_1") {
      return <Heading1 block={block} index={index} />
    }
    if (block.type === "heading_2") {
      return <Heading2 block={block} index={index} />
    }
    if (block.type === "heading_3") {
      return <Heading3 block={block} index={index} />
    }
    if (block.type === "audio") {
      return <Audio block={block} />
    }
    if (block.type === "file") {
      return <File block={block} />
    }
    if (block.type === "bookmark") {
      return <Bookmark block={block} />
    }
    if (block.type === "bulleted_list_item") {
      return <BulletedListItem block={block} />
    }
    if (block.type === "numbered_list_item") {
      return <NumberedListItem block={block} />
    }
    if (block.type === "to_do") {
      return <ToDo block={block} />
    }
    if (block.type === "toggle") {
      return <Toggle block={block} />
    }
    if (block.type === "child_page") {
      return <ChildPage block={block} />
    }
    console.log(`Unsupport block : ${block.type}--${block.id}`)
    return null
  }

  return (
    <div data-block-id={block.id} className={`notion-block`}>
      <SwitchBlock block={block} index={index} />
    </div>
  )
}

export default Block
