const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0

  const rows = input.split("\n")

  let removableRolls = []
  let didIRemoveAnyRolls = true

  while (didIRemoveAnyRolls) {
    for (const [i, j] of removableRolls) {
      rows[i] = rows[i].substring(0, j) + "." + rows[i].substring(j + 1)
    }
    removableRolls = []
    didIRemoveAnyRolls = false

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        if (rows[i][j] !== "@") continue
        let adjacentRolls = 0
        if (rows[i - 1]?.[j - 1] === "@") adjacentRolls++
        if (rows[i - 1]?.[j] === "@") adjacentRolls++
        if (rows[i - 1]?.[j + 1] === "@") adjacentRolls++
        if (rows[i]?.[j - 1] === "@") adjacentRolls++
        if (rows[i]?.[j + 1] === "@") adjacentRolls++
        if (rows[i + 1]?.[j - 1] === "@") adjacentRolls++
        if (rows[i + 1]?.[j] === "@") adjacentRolls++
        if (rows[i + 1]?.[j + 1] === "@") adjacentRolls++

        if (adjacentRolls < 4) {
          result++
          removableRolls.push([i, j])
          didIRemoveAnyRolls = true
        }
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
