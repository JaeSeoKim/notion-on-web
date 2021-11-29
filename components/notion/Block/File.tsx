import React from "react"
import { FileBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import useFileSrc from "../../../lib/hooks/useFileSrc"
import NotionIcon from "../NotionIcon"

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
    src?: string
    filename: string
  }> = ({ src, filename }) => {
    const style = (() => {
      if (!src) {
        return {
          cursor: "wait",
        }
      }
      return {}
    })()

    return (
      <a
        className={`notion-file`}
        style={style}
        href={src}
        target="_blank"
        rel="noreferrer"
      >
        <div className={`notion-file_icon`}>
          <NotionIcon icon={undefined} placeHolderType="link" />
        </div>
        <div className={`notion-file_name`}>{filename}</div>
      </a>
    )
  }

  const ExternalFile: React.FC<{ src: string }> = ({ src }) => {
    return <FileContainer src={src} filename={getFileName(src)} />
  }

  const NotionFile = () => {
    const { data, error } = useFileSrc(block.id)

    if (error) {
      return <FileContainer filename={"Load File Error"} />
    }

    if (data) {
      return <FileContainer src={data.src} filename={getFileName(data.src)} />
    }

    return <FileContainer filename={"Loading..."} />
  }

  return (
    <>
      {block.file.type === "external" ? (
        <ExternalFile src={block.file.external.url} />
      ) : (
        <NotionFile />
      )}
      <Caption caption={block.file.caption} block_id={block.id} />
    </>
  )
}

export default File
