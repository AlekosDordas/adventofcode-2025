const { fileContent } = require("../helpers/getFileContent")
const { clipboardCopy } = require("../helpers/clipboardCopy")

const solution = input => {
  let result = 0

  const rows = input.split("\n")

  const nodes = []
  const graph = {}

  for (let i = 1; i < rows.length; i++) {
    let row = rows[i]
    const lineNodes = []
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "^") {
        lineNodes.push(`${i}x${j}`)
      }
    }
    if (lineNodes.length > 0) {
      nodes.push(lineNodes)
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    const nodeList = nodes[i]
    for (node of nodeList) {
      const nodeY = Number(node.split("x")[1])
      let foundPrev = false
      let foundNext = false
      for (let j = i + 1; j < nodes.length; j++) {
        const targetNodeList = nodes[j]
        for (targetNode of targetNodeList) {
          const targetNodeY = Number(targetNode.split("x")[1])
          if (!foundPrev && targetNodeY == nodeY - 1) {
            if (graph[node]) {
              graph[node].push(targetNode)
            } else {
              graph[node] = [targetNode]
            }
            foundPrev = true
          }
          if (!foundNext && targetNodeY == nodeY + 1) {
            if (graph[node]) {
              graph[node].push(targetNode)
            } else {
              graph[node] = [targetNode]
            }
            foundNext = true
          }
        }
      }
      if (!foundPrev) {
        if (graph[node]) {
          graph[node].push("end1")
        } else {
          graph[node] = ["end1"]
        }
      }
      if (!foundNext) {
        if (graph[node]) {
          graph[node].push("end2")
        } else {
          graph[node] = ["end2"]
        }
      }
    }
  }

  for (let node in graph) {
    if (graph[node][0].split("x")[0] == rows.length - 2) {
      graph[graph[node][0]] = ["end1", "end2"]
    }

    if (graph[node][1].split("x")[0] == rows.length - 2) {
      graph[graph[node][1]] = ["end1", "end2"]
    }
  }

  const countPaths = (graph, start, endNodes) => {
    const memo = {}

    const dfs = node => {
      if (endNodes.includes(node)) {
        return 1
      }

      if (memo[node]) {
        return memo[node]
      }

      let count = 0
      for (const next of graph[node] || []) {
        count += dfs(next)
      }

      memo[node] = count
      return count
    }

    return dfs(start)
  }

  const addMissingNodes = graph => {
    const referenced = []

    for (const key in graph) {
      for (const child of graph[key]) {
        referenced.push(child)
      }
    }

    for (const node of referenced) {
      if (!(node in graph)) {
        graph[node] = ["end1", "end2"]
      }
    }

    if (!("end1" in graph)) graph["end1"] = []
    if (!("end2" in graph)) graph["end2"] = []
    if (!("end" in graph)) graph["end"] = []
  }

  addMissingNodes(graph)

  result = countPaths(graph, "2x70", ["end", "end1", "end2"])

  return result
}

// const sampleResult = solution(fileContent(__dirname, "./sample.txt"))
// console.log(`Sample: ${sampleResult}`)

const inputResult = solution(fileContent(__dirname, "./input.txt"))
console.log(`Input: ${inputResult}`)
clipboardCopy(inputResult.toString())
