import React from "react"
import { RichTextType } from "../../../lib/util/notion/types"
import Tex from "@matejmazur/react-katex"
import dayjs from "dayjs"
import locale_ko from "dayjs/locale/ko"
import Annotations from "./Annotations"
import parseId from "../../../lib/util/notion/parseId"
import Link from "next/link"
import NotionIcon from "../NotionIcon"

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

  if (rich_text.mention.type === "user") {
    return (
      <span
        className={`notion-mention-user`}
        data-user-id={rich_text.mention.user.id}
      >
        {rich_text.plain_text}
      </span>
    )
  }

  if (rich_text.mention.type === "database") {
    // TODO: database.id와 Page URL 연결 하기
    return (
      <span
        className={`notion-mention-database`}
        database-id={rich_text.mention.database.id}
      >
        <NotionIcon icon={undefined} isLink block_id={""} />
        <span className="notion-mention-text">{rich_text.plain_text}</span>
      </span>
    )
  }

  if (rich_text.mention.type === "page") {
    return (
      <Link href={`/${parseId(rich_text.mention.page.id)}`} passHref>
        <span className={`notion-mention-page`}>
          <NotionIcon icon={undefined} isLink />
          <span className="notion-mention-text">{rich_text.plain_text}</span>
        </span>
      </Link>
    )
  }

  if (rich_text.mention.type === "date") {
    const DayFormat = "YYYY년 M월 D일 a h:mm"

    const start = dayjs(rich_text.mention.date.start)
      .locale(locale_ko)
      .format(DayFormat)

    const end =
      rich_text.mention.date.end &&
      dayjs(rich_text.mention.date.end).locale(locale_ko).format(DayFormat)
    return (
      <span className={`notion-mention-date`}>
        @{start}
        {end && (
          <>
            {" → "}
            {end}
          </>
        )}
      </span>
    )
  }

  // @ts-ignore
  console.log(`invaild mention type: ${rich_text.mention.type}`)
  return (
    // @ts-ignore
    <span mention-type={rich_text.mention.type}>{rich_text.plain_text}</span>
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
