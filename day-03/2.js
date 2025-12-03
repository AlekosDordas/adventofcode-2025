const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0

  const rows = input.split("\n")

  const getMaxFromString = str => ({
    max: String(Math.max(...str)),
    pos: str.indexOf(String(Math.max(...str))),
  })

  rows.map(row => {
    let digits = []
    let currentSlice = row

    for (let i = 0; i < 12; i++) {
      const digitsRemaining = 12 - i
      const searchEnd = currentSlice.length - digitsRemaining + 1
      const { max, pos } = getMaxFromString(currentSlice.slice(0, searchEnd))

      digits.push(max)
      currentSlice = currentSlice.slice(pos + 1)
    }

    const number = digits.join("")
    result += Number(number)
  })

  return result
}

// const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
// console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
