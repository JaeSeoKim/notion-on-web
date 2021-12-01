import React from "react"
import { FormulaType } from "../../../lib/util/notion/types"
import DateTime from "./DateTime"

export interface FormulaProps {
  formula: FormulaType
}

const Formula: React.FC<FormulaProps> = ({ formula }) => {
  const Switch = () => {
    switch (formula.type) {
      case "date":
        return <DateTime date={formula.date} />
      case "string":
        return formula.string
      case "number":
        return formula.number
      case "boolean":
        return formula.boolean ? "True" : "False"
    }
  }
  return <div className="notion-formula">{Switch()}</div>
}

export default Formula
