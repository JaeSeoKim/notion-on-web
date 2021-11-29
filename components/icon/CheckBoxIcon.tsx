import React from "react"
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md"

export interface CheckBoxIconProps {
  style?: React.CSSProperties
  className?: string
  checked: boolean
}

const CheckBoxIcon: React.FC<CheckBoxIconProps> = ({
  style,
  className,
  checked,
}) => {
  return (
    <>
      {checked ? (
        <MdCheckBox
          className={className}
          style={{
            display: "inline-block",
            width: "24px",
            height: "24px",
            ...style,
          }}
          fill="rgb(46, 170, 220)"
        />
      ) : (
        <MdCheckBoxOutlineBlank
          className={className}
          style={{
            display: "inline-block",

            width: "24px",
            height: "24px",
            ...style,
          }}
        />
      )}
    </>
  )
}

export default CheckBoxIcon
