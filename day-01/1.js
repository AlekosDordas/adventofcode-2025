const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let total = 50
  let result = 0
  const rows = input.split("\n")

  rows.map(row => {
    let num = Number(row.substring(1))
    let left = row.substring(0, 1) === "L"

    total = left ? total - num : total + num

    if (total % 100 === 0) result++
  })

  return result
}

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
