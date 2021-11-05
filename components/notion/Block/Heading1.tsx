import cs from "classnames"
import React from "react"
import { Heading1Block } from "lib/util/notion/types"
import Text from "../Text"
import FileLinkIcon from "../../icon/FileLinkIcon"

export interface Heading1Props {
  block: Heading1Block
  index?: number
}

const Heading1: React.FC<Heading1Props> = ({ block, index }) => {
  const style = (() => {
    if (index === 0) {
      return {
        marginTop: "4px",
      }
    }
    return {}
  })()

  return (
    <>
      <h1 className={cs(["notion-heading_1"])} style={style} id={block.id}>
        <Text rich_texts={block.heading_1.text} block_id={block.id} />
        <a href={`#${block.id}`} className={`notion-anchor`}>
          <FileLinkIcon />
        </a>
      </h1>
    </>
  )
}

export default Heading1
