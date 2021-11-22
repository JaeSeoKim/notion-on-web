import cs from "classnames"
import React from "react"
import { Heading2Block } from "lib/util/notion/types"
import Text from "../Text"
import FileLinkIcon from "../../icon/FileLinkIcon"
import parseId from "../../../lib/util/notion/parseId"

export interface Heading2Props {
  block: Heading2Block
  index?: number
}

const Heading2: React.FC<Heading2Props> = ({ block, index }) => {
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
      <h2 className={cs(["notion-heading_2"])} style={style} id={block.id}>
        <Text rich_texts={block.heading_2.text} block_id={block.id} />
        <a href={`#${parseId(block.id)}}`} className={`notion-anchor`}>
          <FileLinkIcon />
        </a>
      </h2>
    </>
  )
}

export default Heading2
