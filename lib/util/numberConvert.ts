const convertToRoman: (num: number) => string = (num) => {
  const romanMatrix: [number, string][] = [
    [1000, "m"],
    [900, "cm"],
    [500, "d"],
    [400, "cd"],
    [100, "c"],
    [90, "xc"],
    [50, "l"],
    [40, "xl"],
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ]

  for (let roman of romanMatrix) {
    if (num >= roman[0]) {
      return roman[1] + convertToRoman(num - roman[0])
    }
  }
  return ""
}

const convertToAlpha: (num: number) => string = (num) => {
  if (num <= 26) {
    return String.fromCharCode(num + "a".charCodeAt(0) - 1)
  }

  return (
    String.fromCharCode((num % 25) + "a".charCodeAt(0) - 1) +
    convertToAlpha(num / 25)
  )
}

export { convertToRoman, convertToAlpha }
