import React from "react"
import { DividerBlock } from "../../../lib/util/notion/types"

export interface DividerProps {
  block: DividerBlock
}

const Divider: React.FC<DividerProps> = ({ block }) => {
  return (
    <div className={`notion-divider`}>
      <hr className={`notion-divider_line`} />
    </div>
  )
}

export default Divider
