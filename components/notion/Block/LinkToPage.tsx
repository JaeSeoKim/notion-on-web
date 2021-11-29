import React from "react"
import { LinkToPageBlock } from "../../../lib/util/notion/types"
import Link from "next/link"
import parseId from "../../../lib/util/notion/parseId"
import getPageTitle from "../../../lib/util/notion/getPageTitle"
import Text from "../Text"
import NotionIcon from "../NotionIcon"

export interface LinkToPageProps {
  block: LinkToPageBlock
}

const LinkToPage: React.FC<LinkToPageProps> = ({ block }) => {
  const title = getPageTitle(block.link_to_page.retrieve)

  return (
    <Link href={`/${parseId(block.link_to_page.retrieve.id)}`} passHref>
      <div className={`notion-link_page`}>
        <NotionIcon
          icon={block.link_to_page.retrieve.icon}
          placeHolderType="page"
          isLink
          block_id={block.id}
        />
        <Text rich_texts={title} block_id={block.id} />
      </div>
    </Link>
  )
}

export default LinkToPage
