const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0
  const rows = input.split("\n")

  const lines = []

  for (let i = 0; i < rows.length - 1; i++) {
    const numbers = rows[i]
      .split(" ")
      .filter(x => x !== "")
      .map(Number)
    lines.push(numbers)
  }

  const lastRow = rows[rows.length - 1]
  const acts = lastRow.split(" ").filter(x => x !== "")

  const digitsCount = []

  let count = 1
  for (let i = 1; i < lastRow.length; i++) {
    if (lastRow[i] !== " ") {
      digitsCount.push(count - 1)
      count = 1
    } else {
      count++
    }
  }
  digitsCount.push(count)

  rowIndex = 0
  for (let i = 0; i < lines[0].length; i++) {
    const mul = acts[i] === "*"
    let rowResult = mul ? 1 : 0
    for (let j = 0; j < digitsCount[i]; j++) {
      stringNum = ""
      for (let k = 0; k < lines.length; k++) {
        stringNum += rows[k][rowIndex]
      }

      rowResult = mul
        ? rowResult * Number(stringNum)
        : rowResult + Number(stringNum)
      rowIndex += 1
    }
    result += rowResult
    rowIndex += 1
  }

  return result
}

const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
