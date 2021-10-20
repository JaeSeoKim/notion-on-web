import classNames from "classnames"
import { AnnotationsType } from "lib/util/notion/types"

export interface AnnotationsProps {
  annotations: AnnotationsType
}

const Annotations: React.FC<AnnotationsProps> = ({ annotations, children }) => {
  let wrappers: React.FC[] = []

  if (annotations.code) {
    wrappers.push(({ children }) => (
      <code
        className={classNames([
          annotations.color !== "default" && `notion-${annotations.color}`,
        ])}
      >
        {children}
      </code>
    ))
  } else {
    wrappers.push(({ children }) => {
      if (annotations.color === "default") return <>{children}</>
      return <span className={`notion-${annotations.color}`}>{children}</span>
    })
  }
  if (annotations.bold) wrappers.push(({ children }) => <b>{children}</b>)
  if (annotations.italic) wrappers.push(({ children }) => <i>{children}</i>)
  if (annotations.strikethrough)
    wrappers.push(({ children }) => <s>{children}</s>)
  if (annotations.underline) wrappers.push(({ children }) => <u>{children}</u>)

  const Wrappers: React.FC<{
    wrappers: React.FC[]
    index: number
  }> = ({ wrappers, index, children }) => {
    if (index >= wrappers.length) return <>{children}</>

    const Wrapper = wrappers[index]

    return (
      <Wrapper>
        <Wrappers wrappers={wrappers} index={index + 1}>
          {children}
        </Wrappers>
      </Wrapper>
    )
  }

  return (
    <Wrappers wrappers={wrappers} index={0}>
      {children}
    </Wrappers>
  )
}

export default Annotations
