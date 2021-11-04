import React from "react"
import { EmojiType } from "../../lib/util/notion/types"

export interface EmojiProps {
  emoji: EmojiType
}

const Emoji: React.FC<EmojiProps> = ({ emoji }) => {
  if (!emoji) {
    return null
  }

  if (emoji.type === "emoji") {
    return (
      <span
        role="image"
        aria-label={emoji.emoji}
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols',
          lineHeight: "1em",
        }}
      >
        {emoji.emoji}
      </span>
    )
  }

  return <></>
}

export default Emoji
