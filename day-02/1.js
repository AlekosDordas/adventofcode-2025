const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0

  const ranges = input.split(",")

  ranges.map(range => {
    const start = Number(range.split("-")[0])
    const end = Number(range.split("-")[1])

    for (let i = start; i <= end; i++) {
      const id = String(i)
      if (id.length % 2 == 0) {
        let x = 0
        let y = id.length / 2
        let valid = false
        while (y < id.length) {
          if (id[x] !== id[y]) {
            valid = true
            break
          } else {
            x++
            y++
          }
        }

        if (!valid) result += Number(id)
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
