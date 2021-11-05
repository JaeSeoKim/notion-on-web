import React, { useState } from "react"
import { ToggleBlock } from "lib/util/notion/types"
import Text from "../Text"
import Blocks from "./Blocks"

export interface ToggleProps {
  block: ToggleBlock
}

const Toggle: React.FC<ToggleProps> = ({ block }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`notion-toggle`}>
      <div
        style={{
          userSelect: "none",
          transition: "background 20ms ease-in 0s",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          borderRadius: "3px",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          viewBox="0 0 100 100"
          className="triangle"
          style={{
            width: "0.8em",
            height: "0.8em",
            display: "block",
            fill: "inherit",
            transition: "transform 200ms ease-out 0s",
            transform: isOpen ? "rotateZ(180deg)" : "rotateZ(90deg)",
            opacity: 1,
          }}
        >
          <polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon>
        </svg>
      </div>
      <div style={{ width: "100%" }}>
        <span
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            cursor: "pointer",
          }}
        >
          <Text rich_texts={block.toggle.text} block_id={block.id}></Text>
        </span>
        {isOpen && block.children && (
          <Blocks blocks={block.children} parentId={block.id} />
        )}
      </div>
    </div>
  )
}

export default Toggle
