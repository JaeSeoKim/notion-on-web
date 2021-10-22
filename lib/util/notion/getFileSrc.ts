import { AudioType } from "./types"
import { $ElementType } from "utility-types"
import { notion } from "."

const findFileSrc = (file: $ElementType<AudioType, "audio">) => {
  if (file.type === "file") {
    return file.file.url
  }
  return file.external.url
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

export default getFileSrc
