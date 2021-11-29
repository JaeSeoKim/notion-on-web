import React from "react"
import { ChildPageBlock } from "../../../lib/util/notion/types"
import Link from "next/link"
import parseId from "../../../lib/util/notion/parseId"
import Text from "../Text"
import getPageTitle from "../../../lib/util/notion/getPageTitle"
import NotionIcon from "../NotionIcon"

export interface ChildPageProps {
  block: ChildPageBlock
}

const ChildPage: React.FC<ChildPageProps> = ({ block }) => {
  const title = getPageTitle(block.child_page.retrieve)
  return (
    <Link href={`/${parseId(block.child_page.retrieve.id)}`} passHref>
      <div className={`notion-link_page`}>
        <NotionIcon
          icon={block.child_page.retrieve.icon}
          placeHolderType="page"
          block_id={block.id}
        />
        <Text rich_texts={title} block_id={block.id} />
      </div>
    </Link>
  )
}

export default ChildPage
