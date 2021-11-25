import React from "react"
import { SetIntersection } from "utility-types"
import cs from "classnames"
import { EmojiType } from "../../lib/util/notion/types"
import LinkIcon from "../icon/LinkIcon"
import PageIcon from "../icon/PageIcon"

export type NotionIconProps =
  | {
      icon: EmojiType
      isLink?: unknown
      block_id: string
      style?: React.CSSProperties
      className?: string
    }
  | {
      icon: undefined
      isLink?: unknown
      block_id?: string
      style?: React.CSSProperties
      className?: string
    }

const NotionIcon: React.FC<NotionIconProps> = ({
  icon,
  isLink,
  block_id,
  className,
  style,
}) => {
  const getFileName = (uri: string) => {
    const url = new URL(uri)
    return url.pathname.split("/").pop()
  }

  const File: React.FC<{
    file: SetIntersection<EmojiType, { type: "file" }>["file"]
  }> = ({ file }) => {
    const url = new URL(file.url)
    const imageSrc = `/api/image/${encodeURIComponent(
      `${url.origin}${url.pathname}`
    )}?block_id=${block_id}`

    return (
      <img
        className={cs("notion-icon", className)}
        src={imageSrc}
        alt={getFileName(file.url)}
        style={{
          ...style,
          display: "block",
          objectFit: "cover",
          borderRadius: "3px",
        }}
      />
    )
  }

  const External: React.FC<{
    external: SetIntersection<EmojiType, { type: "external" }>["external"]
  }> = ({ external }) => (
    <img
      className={cs("notion-icon", className)}
      src={external.url}
      alt={getFileName(external.url)}
      style={{
        ...style,
        display: "block",
        objectFit: "cover",
        borderRadius: "3px",
      }}
    />
  )

  const Emoji: React.FC<{
    emoji: SetIntersection<EmojiType, { type: "emoji" }>["emoji"]
  }> = ({ emoji }) => (
    <span
      className={cs("notion-icon", className)}
      role="image"
      aria-label={emoji}
      style={{
        ...style,
        fontFamily:
          '"Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols',
        lineHeight: "1em",
      }}
    >
      {emoji}
    </span>
  )

  const SwitchIcon = () => {
    if (!icon) {
      return <PageIcon style={style} className={cs("notion-icon", className)} />
    }
    switch (icon.type) {
      case "emoji":
        return <Emoji emoji={icon.emoji} />
      case "external":
        return <External external={icon.external} />
      case "file":
        return <File file={icon.file} />
    }
  }
  return (
    <span className={`notion-icon-container`}>
      <SwitchIcon />
      {typeof isLink !== "undefined" && <LinkIcon />}
    </span>
  )
}

export default NotionIcon
