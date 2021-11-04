import React from "react"
import { PdfBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import FileLinkIcon from "../../icon/FileLinkIcon"

export interface PdfProps {
  block: PdfBlock
}

const Pdf: React.FC<PdfProps> = ({ block }) => {
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
      {block.pdf.type === "external" ? (
        <FileContainer
          src={block.pdf.external.url}
          filename={getFileName(block.pdf.external.url)}
        />
      ) : (
        <FileContainer
          src={`/api/file/${block.id}`}
          filename={getFileName(block.pdf.file.url)}
        />
      )}
      <Caption caption={block.pdf.caption} block_id={block.id} />
    </>
  )
}

export default Pdf
