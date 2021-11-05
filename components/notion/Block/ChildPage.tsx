import React from "react"
import PageIcon from "../../icon/PageIcon"
import { ChildPageBlock } from "../../../lib/util/notion/types"
import Link from "next/link"
import parseId from "../../../lib/util/notion/parseId"

export interface ChildPageProps {
  block: ChildPageBlock
}

const ChildPage: React.FC<ChildPageProps> = ({ block }) => {
  return (
    <Link href={`/${parseId(block.child_page.retrieve.id)}`} passHref>
      <div className={`notion-child_page`}>
        <PageIcon />
        <span className={`notion-text`}>{block.child_page.title}</span>
      </div>
    </Link>
  )
}

export default ChildPage
