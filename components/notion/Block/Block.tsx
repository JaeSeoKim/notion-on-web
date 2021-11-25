import React, { useContext } from "react"
import { BlocksContext } from "./Blocks"
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
import ImageBlock from "./Image"
import ColumnList from "./ColumnList"
import Column from "./Column"
import Callout from "./Callout"
import Equation from "./Equation"
import Code from "./Code"
import Quote from "./Quote"
import Divider from "./Divider"
import SyncedBlock from "./SyncedBlock"
import LinkToPage from "./LinkToPage"
import ChildDatabase from "./ChildDatabase"

export interface BlockProps {
  block: BlockType
  index: number
}

const Block: React.FC<BlockProps> = ({ block, index }) => {
  const { checkBlockType } = useContext(BlocksContext)
  checkBlockType(block.type)

  const SwitchBlock: React.FC<BlockProps> = ({ block, index }) => {
    switch (block.type) {
      case "paragraph":
        return <Paragraph block={block} />
      case "heading_1":
        return <Heading1 block={block} index={index} />
      case "heading_2":
        return <Heading2 block={block} index={index} />
      case "heading_3":
        return <Heading3 block={block} index={index} />
      case "audio":
        return <Audio block={block} />
      case "file":
        return <File block={block} />
      case "pdf":
        return <Pdf block={block} />
      case "video":
        return <Video block={block} />
      case "embed":
        return <Embed block={block} />
      case "image":
        return <ImageBlock block={block} />
      case "bookmark":
        return <Bookmark block={block} />
      case "column":
        return <Column block={block} />
      case "column_list":
        return <ColumnList block={block} />
      case "bulleted_list_item":
        return <BulletedListItem block={block} />
      case "numbered_list_item":
        return <NumberedListItem block={block} />
      case "callout":
        return <Callout block={block} />
      case "child_page":
        return <ChildPage block={block} />
      case "equation":
        return <Equation block={block} />
      case "code":
        return <Code block={block} />
      case "toggle":
        return <Toggle block={block} />
      case "quote":
        return <Quote block={block} />
      case "to_do":
        return <ToDo block={block} />
      case "divider":
        return <Divider block={block} />
      case "synced_block":
        return <SyncedBlock block={block} />
      case "link_to_page":
        return <LinkToPage block={block} />
      case "child_database":
        return <ChildDatabase block={block} />
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
