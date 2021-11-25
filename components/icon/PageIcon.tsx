import React from "react"
import { BsFileEarmarkText } from "react-icons/bs"

export interface PageIconProps {
  style?: React.CSSProperties
  className?: string
}

const PageIcon: React.FC<PageIconProps> = ({ className, style }) => (
  <BsFileEarmarkText
    className={className}
    style={{
      ...style,
    }}
  />
)

export default PageIcon
