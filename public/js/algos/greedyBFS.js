import { tableGraph } from "../creator.js";

import { startAnimation } from "./utils/startAnimation.js";
export function useGreedyBfs(start, end, isWeighted = false) {
  const visited = new Set();
  let visitedNodesId = [];
  const path = [];
  const queue = [
    {
      vertex: tableGraph.getVertexByValue(start),
      id: start,
      cost: 0,
      heuristic: manhattanDistance(start, end),
      prev: null,
    },
  ];

  while (queue.length > 0) {
    queue.sort((a, b) => a.heuristic - b.heuristic);
    const current = queue.shift();
    if (visited.has(current.vertex)) {
      continue;
    }

    visited.add(current.vertex);
    path.push(current);
    if (current.id === end) {
      break;
    }

    const tableNeightbours = tableGraph.getVertexByValue(current.id).edges;
    for (const edge of tableNeightbours) {
      const neighbor = edge.end;
      const neighborID = edge.end.data;
      const newCost = current.cost + (isWeighted ? edge.weight : 1);
      const newNode = {
        vertex: neighbor,
        id: edge.end.data,
        cost: newCost,
        heuristic: manhattanDistance(neighborID, end),
        prev: current.vertex,
      };
      queue.push(newNode);
      visitedNodesId.push(newNode.id);
    }
  }

  try {
    let pathToColor = [];
    let currentNode = path.find((node) => node.id === end);
    while (currentNode != null) {
      pathToColor.push(currentNode.id);
      if (currentNode.prev == null) {
        break;
      }
      currentNode = path.find((node) => node.id === currentNode.prev.data);
    }
    pathToColor = pathToColor.filter((value) => {
      return value != start && value != end;
    });
    pathToColor.reverse();
    visitedNodesId = visitedNodesId.filter((value, index, self) => {
      return self.indexOf(value) === index && value != start && value != end;
    });
    startAnimation(visitedNodesId, pathToColor);
  } catch (err) {
    console.log(err);
  }
  return null;
}

function manhattanDistance(vertexOne, vertexTwo) {
  let nodeOneCoordinates = vertexOne.split("-");
  let nodeTwoCoordinates = vertexTwo.split("-").map((ele) => parseInt(ele));
  let xOne = nodeOneCoordinates[0];
  let xTwo = nodeTwoCoordinates[0];
  let yOne = nodeOneCoordinates[1];
  let yTwo = nodeTwoCoordinates[1];

  return Math.abs(xOne - xTwo) + Math.abs(yOne - yTwo);
}
