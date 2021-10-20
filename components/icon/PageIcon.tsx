import { VscFile } from "react-icons/vsc"

const PageIcon = () => (
  <span
    style={{
      whiteSpace: "nowrap",
      width: "1.1em",
      display: "inline-block",
      verticalAlign: "-0.15em",
      position: "relative",
      marginRight: "0.2em",
    }}
  >
    <VscFile
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        fill: "inherit",
        flexShrink: 0,
      }}
    />
  </span>
)

export default PageIcon
