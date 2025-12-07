const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0

  const rows = input.split("\n")

  let ingredientsStartingLine = 0
  let ranges = []

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]

    if (row === "") {
      ingredientsStartingLine = i + 1
      break
    }

    ranges.push({
      start: Number(row.split("-")[0]),
      end: Number(row.split("-")[1]),
    })
  }

  for (let j = ingredientsStartingLine; j < rows.length; j++) {
    let ingredient = Number(rows[j])

    for (const range of ranges) {
      if (ingredient >= range.start && ingredient <= range.end) {
        result++
        break
      }
    }
  }

  return result
}

const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
