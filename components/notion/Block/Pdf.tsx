import React from "react"
import { PdfBlock } from "../../../lib/util/notion/types"
import Caption from "./Caption"
import FileLinkIcon from "../../icon/FileLinkIcon"
import useFileSrc from "../../../lib/hooks/useFileSrc"

export interface PdfProps {
  block: PdfBlock
}

const Pdf: React.FC<PdfProps> = ({ block }) => {
  const getPdfName = (uri: string) => {
    const slice_path = uri.split("?")[0].split("/")

    const encodePdfName = slice_path[slice_path.length - 1]

    return encodePdfName === "" ? "Pdf" : decodeURI(encodePdfName)
  }

  const PdfContainer: React.FC<{
    src?: string
    Pdfname: string
  }> = ({ src, Pdfname }) => {
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
          <FileLinkIcon />
        </div>
        <div className={`notion-file_name`}>{Pdfname}</div>
      </a>
    )
  }

  const ExternalPdf: React.FC<{ src: string }> = ({ src }) => {
    return <PdfContainer src={src} Pdfname={getPdfName(src)} />
  }

  const PdfFile = () => {
    const { data, error } = useFileSrc(block.id)
    if (error) {
      return <PdfContainer Pdfname={"Load File Error"} />
    }

    if (data) {
      return <PdfContainer src={data.src} Pdfname={getPdfName(data.src)} />
    }

    return <PdfContainer Pdfname={"Loading..."} />
  }

  return (
    <>
      {block.pdf.type === "external" ? (
        <ExternalPdf src={block.pdf.external.url} />
      ) : (
        <PdfFile />
      )}
      <Caption caption={block.pdf.caption} block_id={block.id} />
    </>
  )
}

export default Pdf
