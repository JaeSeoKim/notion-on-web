import cs from "classnames"
import React from "react"
import { Heading3Block } from "lib/util/notion/types"
import Text from "../Text"
import FileLinkIcon from "../../icon/FileLinkIcon"
import parseId from "../../../lib/util/notion/parseId"

export interface Heading3Props {
  block: Heading3Block
  index?: number
}

const Heading3: React.FC<Heading3Props> = ({ block, index }) => {
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
      <h3 className={cs(["notion-heading_3"])} style={style} id={block.id}>
        <Text rich_texts={block.heading_3.text} block_id={block.id} />
        <a href={`#${parseId(block.id)}`} className={`notion-anchor`}>
          <FileLinkIcon />
        </a>
      </h3>
    </>
  )
}

export default Heading3
