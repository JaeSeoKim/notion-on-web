import React from "react"
import PageIcon from "../../icon/PageIcon"
import { ChildPageBlock } from "../../../lib/util/notion/types"

export interface ChildPageProps {
  block: ChildPageBlock
}

const ChildPage: React.FC<ChildPageProps> = ({ block }) => {
  return (
    <div className={`notion-child_page`} page-id={block.id}>
      <span>
        <PageIcon />
        <span className={`notion-text`} style={{ whiteSpace: "nowrap" }}>
          {block.child_page.title}
        </span>
      </span>
    </div>
  )
}

export default ChildPage
