import { Graph } from "./algos/DS/Graph.js";
import { merge } from "./algos/utils/merge.js";

export let tableGraph = new Graph();
export let graphVertices = [];
export let velocity = Number(document.getElementById("myVelocity").value);

export function updateVelocity(newVelocity) {
  velocity = newVelocity;
}
export function updateGraph(newTable, newVertices) {
  tableGraph = newTable;
  graphVertices = newVertices;

  mergeVertices();
}

export const generateTable = (w = 20, h = 20) => {
  const tableID = document.getElementById("grid");
  tableGraph = new Graph();
  graphVertices = [];

  const startPoint = {
    x: Math.floor(h / 2),
    y: Math.floor(w / 4),
  };
  const endPoint = {
    x: Math.floor(h / 2),
    y: Math.floor(w / 1.4),
  };

  for (let i = 0; i < h; i++) {
    const row = document.createElement("tr");
    const row_graph = [];

    for (let j = 0; j < w; j++) {
      const col = createTableCell(i, j, startPoint, endPoint);
      row_graph.push(tableGraph.addVertex(col.id));
      row.appendChild(col);
    }

    graphVertices.push(row_graph);
    tableID.appendChild(row);
  }

  mergeVertices();
};

function createTableCell(i, j, startPoint, endPoint) {
  const col = document.createElement("td");
  col.id = `${i}-${j}`;
  col.className = "unvisited";

  if (i === startPoint.x && j === startPoint.y) {
    col.className = "start";
  } else if (i === endPoint.x && j === endPoint.y) {
    col.className = "end";
  }

  return col;
}

generateTable();

function mergeVertices() {
  const numRows = graphVertices.length;
  const numCols = graphVertices[0].length;

  for (let rowNum = 0; rowNum < numRows; rowNum++) {
    for (let colNum = 0; colNum < numCols; colNum++) {
      const currentVertex = graphVertices[rowNum][colNum];

      // We are at a vertex wall, so skip
      if (document.getElementById(currentVertex.data).className === "wall") {
        continue;
      }

      const directions = [
        { x: -1, y: 0 }, // up
        { x: 1, y: 0 }, // down
        { x: 0, y: -1 }, // left
        { x: 0, y: 1 }, // right
      ];

      for (const { x, y } of directions) {
        const newRow = rowNum + x;
        const newCol = colNum + y;

        if (
          newRow >= 0 &&
          newRow < numRows &&
          newCol >= 0 &&
          newCol < numCols
        ) {
          merge(currentVertex, graphVertices[newRow][newCol]);
        }
      }
    }
  }
}
