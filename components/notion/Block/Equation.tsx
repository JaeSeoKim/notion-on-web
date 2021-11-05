import React from "react"
import { EquationBlock } from "../../../lib/util/notion/types"
import Tex from "@matejmazur/react-katex"

export interface EquationProps {
  block: EquationBlock
}

const Equation: React.FC<EquationProps> = ({ block }) => {
  return (
    <div className={`notion-equation`}>
      <Tex
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1em 0px",
        }}
        math={block.equation.expression}
      />
    </div>
  )
}

export default Equation
