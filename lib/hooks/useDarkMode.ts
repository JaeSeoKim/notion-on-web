import useDarkMode_ori from "use-dark-mode"

const useDarkMode = () => {
  return useDarkMode_ori(false, {
    classNameDark: "drak",
    classNameLight: "light",
  })
}

export default useDarkMode
