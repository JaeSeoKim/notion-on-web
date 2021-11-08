import React, { useContext } from "react"
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
import Pdf from "./Pdf"
import Video from "./Video"
import Embed from "./Embed"
import Image from "./Image"
import ColumnList from "./ColumnList"
import { BlocksContext } from "./Blocks"
import Column from "./Column"
import Callout from "./Callout"
import Equation from "./Equation"
import Code from "./Code"
import Quote from "./Quote"
import Divider from "./Divider"

export interface BlockProps {
  block: BlockType
  index: number
}

const Block: React.FC<BlockProps> = ({ block, index }) => {
  const { checkBlockType } = useContext(BlocksContext)
  checkBlockType(block.type)

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
    if (block.type === "pdf") {
      return <Pdf block={block} />
    }
    if (block.type === "video") {
      return <Video block={block} />
    }
    if (block.type === "embed") {
      return <Embed block={block} />
    }
    if (block.type === "image") {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image block={block} />
    }
    if (block.type === "bookmark") {
      return <Bookmark block={block} />
    }
    if (block.type === "column") {
      return <Column block={block} />
    }
    if (block.type === "column_list") {
      return <ColumnList block={block} />
    }
    if (block.type === "bulleted_list_item") {
      return <BulletedListItem block={block} />
    }
    if (block.type === "numbered_list_item") {
      return <NumberedListItem block={block} />
    }
    if (block.type === "callout") {
      return <Callout block={block} />
    }
    if (block.type === "child_page") {
      return <ChildPage block={block} />
    }
    if (block.type === "equation") {
      return <Equation block={block} />
    }
    if (block.type === "code") {
      return <Code block={block} />
    }
    if (block.type === "toggle") {
      return <Toggle block={block} />
    }
    if (block.type === "quote") {
      return <Quote block={block} />
    }
    if (block.type === "to_do") {
      return <ToDo block={block} />
    }
    if (block.type === "divider") {
      return <Divider block={block} />
    }
    console.log(`Unsupport block : ${block.type}__${block.id}`)
    return null
  }

  return (
    <div data-block-id={block.id} className={`notion-block`}>
      <SwitchBlock block={block} index={index} />
    </div>
  )
}

export default Block
