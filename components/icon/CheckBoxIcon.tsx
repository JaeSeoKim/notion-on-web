const CheckBoxIcon = ({ checked }: { checked: boolean }) => {
  return (
    <div
      style={{
        width: "16px",
        height: "16px",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
        flexShrink: 0,
        flexGrow: 0,
        cursor: "pointer",
        transition: "background 200ms ease-out 0s",
        ...(checked ? { background: "rgb(46, 170, 220)" } : {}),
      }}
    >
      <div
        style={{
          userSelect: "none",
          transition: "background 20ms ease-in 0s",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {checked ? (
          <svg
            viewBox="0 0 14 14"
            style={{
              width: "12px",
              height: "12px",
              display: "block",
              fill: "white",
              flexShrink: 0,
            }}
          >
            <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
          </svg>
        ) : (
          <svg
            viewBox="0 0 16 16"
            style={{
              display: "block",
              fill: "black",
              flexShrink: 0,
            }}
          >
            <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path>
          </svg>
        )}
      </div>
    </div>
  )
}

export default CheckBoxIcon
