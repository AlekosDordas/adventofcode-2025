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
    const { max: max1, pos: max1pos } = getMaxFromString(row.slice(0, -1))

    const { max: max2 } = getMaxFromString(row.slice(max1pos + 1))
    result += Number(max1) * 10 + Number(max2)
  })

  return result
}

// const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
// console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
