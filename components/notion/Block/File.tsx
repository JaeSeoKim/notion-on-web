import React from "react"
import { FileBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import FileLinkIcon from "../../icon/FileLinkIcon"

export interface FileProps {
  block: FileBlock
}

const File: React.FC<FileProps> = ({ block }) => {
  const getFileName = (uri: string) => {
    const slice_path = uri.split("?")[0].split("/")

    const encodeFileName = slice_path[slice_path.length - 1]

    return encodeFileName === "" ? "File" : decodeURI(encodeFileName)
  }

  const FileContainer: React.FC<{
    src: string
    filename: string
  }> = ({ src, filename }) => {
    return (
      <a className={`notion-file`} href={src} target="_blank" rel="noreferrer">
        <div className={`notion-file_icon`}>
          <FileLinkIcon />
        </div>
        <div className={`notion-file_name`}>{filename}</div>
      </a>
    )
  }

  return (
    <>
      {block.file.type === "external" ? (
        <FileContainer
          src={block.file.external.url}
          filename={getFileName(block.file.external.url)}
        />
      ) : (
        <FileContainer
          src={`/api/file/${block.id}`}
          filename={getFileName(block.file.file.url)}
        />
      )}
      <Caption caption={block.file.caption} block_id={block.id} />
    </>
  )
}

export default File
