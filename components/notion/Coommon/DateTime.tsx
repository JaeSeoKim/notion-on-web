import dayjs from "dayjs"
import React from "react"
import { SetIntersection } from "utility-types"
import { MentionType } from "../../../lib/util/notion/types"

export interface DateTimeProps {
  date: SetIntersection<MentionType, { type: "date" }>["date"] | null
}

const DateTime: React.FC<DateTimeProps> = ({ date }) => {
  if (!date) return null

  const DayFormat = "YYYY MM.DD HH:MM"

  const start = dayjs(date.start).format(DayFormat)

  const end = date.end && dayjs(date.end).format(DayFormat)
  return (
    <span className={`notion-date`}>
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

export default DateTime
