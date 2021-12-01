import React from "react"
import cs from "classnames"
import { SelectType } from "../../../lib/util/notion/types"

export interface SelectProps {
  select: SelectType
}

const Select: React.FC<SelectProps> = ({ select }) => {
  if (!select) return null

  return (
    <span className={cs(`notion-select`, `notion-${select.color}_background`)}>
      {select.name}
    </span>
  )
}

export default Select
