import React from "react"

export interface NumberProps {
  number: number | null
}

const Number: React.FC<NumberProps> = ({ number }) => {
  if (!number) return null

  return <span>{number}</span>
}

export default Number
