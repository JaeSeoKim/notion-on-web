import React from "react"
import useFileSrc from "../../lib/hooks/useFileSrc"
import { EmojiType } from "../../lib/util/notion/types"

export interface EmojiProps {
  emoji: EmojiType
  block_id: string
}

const Emoji: React.FC<EmojiProps> = ({ emoji, block_id }) => {
  const getFileName = (uri: string) => {
    const slice_path = uri.split("?")[0].split("/")

    const encodeFileName = slice_path[slice_path.length - 1]

    return encodeFileName === "" ? "File" : decodeURI(encodeFileName)
  }

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

  if (emoji.type === "external") {
    return (
      <img
        src={emoji.external.url}
        alt={getFileName(emoji.external.url)}
        style={{
          display: "block",
          objectFit: "cover",
          borderRadius: "3px",
        }}
      />
    )
  }

  const NotionEmoji = () => {
    const { data } = useFileSrc(block_id)

    if (!data) {
      return (
        <span
          style={{
            display: "block",
            backgroundColor: "#fff",
            borderRadius: "3px",
          }}
        />
      )
    }

    return (
      <img
        src={data.src}
        alt={getFileName(emoji.file.url)}
        style={{
          display: "block",
          objectFit: "cover",
          borderRadius: "3px",
        }}
      />
    )
  }

  if (emoji.type === "file") {
    return <NotionEmoji />
  }

  return <></>
}

export default Emoji
