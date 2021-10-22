import React from "react"
import { FileBlock } from "../../../lib/util/notion/types"
import Children from "./Children"
import Caption from "./Caption"
import useRequest from "../../../lib/util/useRequest"
import { GetFileSuccessType } from "../../../pages/api/file/[block_id]"
import FileLinkIcon from "../../icon/FileLinkIcon"

export interface FileProps {
  block: FileBlock
}

const File: React.FC<FileProps> = ({ block }) => {
  const getFileName = (uri: string) => {
    const slice_path = uri.split("?")[0].split("/")

    const encodeFileName = slice_path.at(slice_path.length - 1)

    return encodeFileName ? decodeURI(encodeFileName) : "file"
  }

  const FileContainer: React.FC<{ src?: string; filename: string }> = ({
    src,
    filename,
  }) => {
    return (
      <a className={`notion-file`} href={src}>
        <div className={`notion-file_icon`}>
          <FileLinkIcon />
        </div>
        <div className={`notion-file_name`}>{filename}</div>
      </a>
    )
  }

  const ExternalFile: React.FC<{ src: string }> = ({ src }) => {
    return <FileContainer src={src} filename={getFileName(src)} />
  }

  const FileFile = () => {
    const { data, error } = useRequest<GetFileSuccessType>(
      {
        url: `/api/file/${block.id}`,
      },
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    )
    if (error) {
      return <FileContainer filename={"load file error"} />
    }

    if (data) {
      return <FileContainer src={data.src} filename={getFileName(data.src)} />
    }

    return <FileContainer filename={"loading..."} />
  }

  console.log(block.file)
  return (
    <>
      {block.file.type === "external" ? (
        <ExternalFile src={block.file.external.url} />
      ) : (
        <FileFile />
      )}
      <Caption caption={block.file.caption} block_id={block.id} />
      {block.children && (
        <Children blocks={block.children} parentId={block.id} />
      )}
    </>
  )
}

export default File
