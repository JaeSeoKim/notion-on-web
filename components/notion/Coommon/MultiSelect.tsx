import React from "react"
import { MultiSelectType } from "../../../lib/util/notion/types"
import Select from "./Select"

export interface MultiSelectProps {
  multi_select: MultiSelectType
}

const MultiSelect: React.FC<MultiSelectProps> = ({ multi_select }) => {
  return (
    <div className="notion-selects">
      {multi_select.map((select) => (
        <Select key={select.id} select={select} />
      ))}
    </div>
  )
}

export default MultiSelect
