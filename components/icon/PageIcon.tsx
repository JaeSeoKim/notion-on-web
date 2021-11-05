import { VscFile } from "react-icons/vsc"

const PageIcon = () => (
  <span
    style={{
      whiteSpace: "nowrap",
      width: "24px",
      height: "24px",
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
      }}
    />
  </span>
)

export default PageIcon
