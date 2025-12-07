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

  const acts = rows[rows.length - 1].split(" ").filter(x => x !== "")

  for (let i = 0; i < lines[0].length; i++) {
    const mul = acts[i] === "*"
    lineResult = mul ? 1 : 0

    for (let j = 0; j < lines.length; j++) {
      lineResult = mul ? lineResult * lines[j][i] : lineResult + lines[j][i]
    }
    result += lineResult
  }

  return result
}

const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
