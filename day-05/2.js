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

  let countedRanges = []

  for (let i = 0; i < ranges.length; i++) {
    let range = ranges[i]
    let rangesToAdd = [{ start: range.start, end: range.end }]

    for (let j = 0; j < countedRanges.length; j++) {
      let countedRange = countedRanges[j]
      let newRangesToAdd = []

      for (let rangeToAdd of rangesToAdd) {
        if (
          rangeToAdd.end < countedRange.start ||
          rangeToAdd.start > countedRange.end
        ) {
          newRangesToAdd.push(rangeToAdd)
        } else if (
          rangeToAdd.start < countedRange.start &&
          rangeToAdd.end >= countedRange.start &&
          rangeToAdd.end <= countedRange.end
        ) {
          if (rangeToAdd.start < countedRange.start) {
            newRangesToAdd.push({
              start: rangeToAdd.start,
              end: countedRange.start - 1,
            })
          }
        } else if (
          rangeToAdd.start >= countedRange.start &&
          rangeToAdd.start <= countedRange.end &&
          rangeToAdd.end > countedRange.end
        ) {
          if (rangeToAdd.end > countedRange.end) {
            newRangesToAdd.push({
              start: countedRange.end + 1,
              end: rangeToAdd.end,
            })
          }
        } else if (
          rangeToAdd.start >= countedRange.start &&
          rangeToAdd.end <= countedRange.end
        ) {
        } else if (
          rangeToAdd.start < countedRange.start &&
          rangeToAdd.end > countedRange.end
        ) {
          newRangesToAdd.push({
            start: rangeToAdd.start,
            end: countedRange.start - 1,
          })
          newRangesToAdd.push({
            start: countedRange.end + 1,
            end: rangeToAdd.end,
          })
        }
      }

      rangesToAdd = newRangesToAdd
    }

    countedRanges.push(...rangesToAdd)
  }

  result = 0
  for (const range of countedRanges) {
    result += range.end - range.start + 1
  }

  console.log("Total counted ranges:", countedRanges.length)
  console.log("Total result:", result)

  return result
}

const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
