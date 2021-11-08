import React from "react"
import { CodeBlock } from "../../../lib/util/notion/types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneLight } from "react-syntax-highlighter/dist/cjs/styles/hljs"

export interface CodeProps {
  block: CodeBlock
}

const Code: React.FC<CodeProps> = ({ block }) => {
  const plainCode = (() => block.code.text.map((t) => t.plain_text).join(""))()

  return (
    <div className={`notion-code`}>
      <span className={`notion-code_language`}>{block.code.language}</span>
      <CopyToClipboard text={plainCode}>
        <span className={`notion-code_copy`}>copy</span>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={block.code.language}
        style={atomOneLight}
        customStyle={{
          padding: "34px 16px 32px 32px",
        }}
      >
        {plainCode}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code
