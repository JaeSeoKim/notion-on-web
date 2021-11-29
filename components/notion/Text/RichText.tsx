import React from "react"
import { RichTextType } from "../../../lib/util/notion/types"
import Tex from "@matejmazur/react-katex"
import dayjs from "dayjs"
import locale_ko from "dayjs/locale/ko"
import Annotations from "./Annotations"
import parseId from "../../../lib/util/notion/parseId"
import Link from "next/link"
import NotionIcon from "../NotionIcon"
import Mention from "../Coommon/Mention"

export interface RichTextProps {
  rich_text: RichTextType
}

const SwitchRichText: React.FC<RichTextProps> = ({ rich_text }) => {
  if (rich_text.type === "text") {
    if (rich_text.text.link) {
      if (rich_text.text.link.url.startsWith("/")) {
        return (
          <Link href={rich_text.text.link.url}>
            <a>{rich_text.text.content}</a>
          </Link>
        )
      }

      return (
        <a
          href={rich_text.text.link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {rich_text.text.content}
        </a>
      )
    }
    return <>{rich_text.text.content}</>
  }

  if (rich_text.type === "equation") {
    return <Tex math={rich_text.equation.expression} />
  }

  return (
    <Mention mention={rich_text.mention} plain_text={rich_text.plain_text} />
  )
}

const RichText: React.FC<RichTextProps> = ({ rich_text }) => {
  return (
    <Annotations annotations={rich_text.annotations}>
      <SwitchRichText rich_text={rich_text} />
    </Annotations>
  )
}

export default RichText
