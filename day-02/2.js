const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0

  const ranges = input.split(",")

  const areAllNumbersTheSame = (arr, checkpoints) => {
    for (let i = 1; i < checkpoints.length; i++) {
      if (arr[checkpoints[i - 1]] !== arr[checkpoints[i]]) return false
    }

    return true
  }

  const checkForNSubstrings = (n, id) => {
    if (!(id.length % n == 0)) {
      return true
    } else {
      let checkpoints = []
      const chunksize = id.length / n

      for (let k = 0; k < n; k++) {
        checkpoints[k] = k * chunksize
      }

      while (checkpoints[n - 1] < id.length) {
        if (!areAllNumbersTheSame(id, checkpoints)) {
          return true
        } else {
          checkpoints = checkpoints.map(i => i + 1)
        }
      }

      return false
    }
  }

  ranges.map(range => {
    const start = Number(range.split("-")[0])
    const end = Number(range.split("-")[1])
    const checked = {}

    for (let i = start; i <= end; i++) {
      const id = String(i)

      for (let j = 2; j <= id.length; j++) {
        if (!checkForNSubstrings(j, id)) {
          if (!checked[id]) result += i
          checked[id] = 1
        }
      }
    }
  })

  return result
}

// const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
// console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
