const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0
  let min = 999999999999999999999
  let max = 0
  let x = 0
  let y = 0
  let z = 0
  let found = false
  let dict = {}
  let arr = new Array(12).fill(0)

  // const dict = { a: 1, b: 2, c: 3 }
  // for (const key in dict) {
  //   console.log(key, dict[key])
  // }

  // for (const char of row) {
  //   console.log(row)
  // }

  const rows = input.split("\n")

  rows.map((row, i) => {
    let numRow = Number(row)
  })

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]
    let numRow = Number(row)
  }

  return result
}

const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
