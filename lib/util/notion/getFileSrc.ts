import { AudioType, CalloutType } from "./types"
import { $ElementType, $NonMaybeType } from "utility-types"
import { notion } from "."

const findFileSrc = (file: $ElementType<AudioType, "audio">) => {
  if (file.type === "external") {
    return { url: file.external.url }
  }
  return { url: file.file.url, expiry_time: file.file.expiry_time }
}
const findEmojiSrc = (
  file: $ElementType<$ElementType<CalloutType, "callout">, "icon">
) => {
  if (!file || file.type === "emoji") {
    return undefined
  }
  if (file.type === "external") {
    return { url: file.external.url }
  }
  if (file.type === "file") {
    return { url: file.file.url, expiry_time: file.file.expiry_time }
  }
}

const getFileSrc = async (block_id: string) => {
  const block = await notion.blocks.retrieve({
    block_id: block_id,
  })
  if (block.type === "audio") {
    return findFileSrc(block.audio)
  }
  if (block.type === "file") {
    return findFileSrc(block.file)
  }
  if (block.type === "pdf") {
    return findFileSrc(block.pdf)
  }
  if (block.type === "video") {
    return findFileSrc(block.video)
  }
}

export const getImageSrc = async (block_id: string) => {
  const block = await notion.blocks.retrieve({
    block_id: block_id,
  })

  if (block.type === "callout") {
    return findEmojiSrc(block.callout.icon)
  }

  if (block.type === "child_page") {
    const page = await notion.pages.retrieve({
      page_id: block.id,
    })
    return findEmojiSrc(page.icon)
  }

  if (block.type === "child_database") {
    const database = await notion.databases.retrieve({
      database_id: block.id,
    })
    return findEmojiSrc(database.icon)
  }

  if (block.type === "image") {
    return findFileSrc(block.image)
  }
}

export default getFileSrc
