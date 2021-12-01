import React from "react"
import Link from "next/link"
import parseId from "../../../lib/util/notion/parseId"
import { MentionType } from "../../../lib/util/notion/types"
import NotionIcon from "../NotionIcon"
import User from "./User"
import DateTime from "./DateTime"

export interface MentionProps {
  mention: MentionType
  plain_text: string
}

const Mention: React.FC<MentionProps> = ({ mention, plain_text }) => {
  switch (mention.type) {
    case "user":
      return <User user={mention.user} />
    case "database":
      return (
        <span className={`notion-mention`} database-id={mention.database.id}>
          <NotionIcon placeHolderType="page" icon={undefined} isLink />
          <span>{plain_text}</span>
        </span>
      )

    case "page":
      return (
        <Link href={`/${parseId(mention.page.id)}`}>
          <a className={`notion-mention`}>
            <NotionIcon
              style={{
                width: "1em",
                height: "1em",
              }}
              placeHolderType="page"
              icon={undefined}
              isLink
            />
            <span>{plain_text}</span>
          </a>
        </Link>
      )
    case "date":
      return <DateTime date={mention.date} />

    default:
      console.log(`invaild mention type: ${mention.type}`)
      return <span mention-type={mention.type}>{plain_text}</span>
  }
}

export default Mention
