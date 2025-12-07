const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0

  const rows = input.split("\n")

  const splitterPositions = []
  let beamPositions = [rows[0].indexOf("S")]

  for (let i = 1; i < rows.length; i++) {
    let row = rows[i]
    const lineSplitterPositions = []
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "^") {
        lineSplitterPositions.push(j)
      }
    }
    if (lineSplitterPositions.length > 0) {
      splitterPositions.push(lineSplitterPositions)
    }
  }

  for (let i = 0; i < splitterPositions.length; i++) {
    let newBeamPositions = []
    for (let j = 0; j < beamPositions.length; j++) {
      const beamPos = beamPositions[j]
      if (splitterPositions[i].includes(beamPos)) {
        result++
        if (!newBeamPositions.includes(beamPos - 1)) {
          newBeamPositions.push(beamPos - 1)
        }
        if (!newBeamPositions.includes(beamPos + 1)) {
          newBeamPositions.push(beamPos + 1)
        }
      } else {
        if (!newBeamPositions.includes(beamPos)) {
          newBeamPositions.push(beamPos)
        }
      }
    }
    beamPositions = newBeamPositions
  }

  return result
}

// const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
// console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
