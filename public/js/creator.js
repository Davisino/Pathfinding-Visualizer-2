import { Graph } from "./algos/DS/Graph.js";
import { merge } from "./algos/utils/merge.js";
import { colorTd } from "./tableFunctionality.js";
// import * as tableFunctionality from "./tableFunctionality.js";

export let tableGraph = new Graph();
export let graphVertices = [];
export let velocity = Number(document.getElementById("myVelocity").value);

// UPDATE VELOCITY
export function updateVelocity(newVelocity) {
  velocity = newVelocity;
}
export function updateGraph(newTable, newVertices) {
  tableGraph = newTable;
  graphVertices = newVertices;
  mergeVertices();
}

export const generateTable = (w = 45, h = 25) => {
  const tableID = document.getElementById("grid");
  tableGraph = new Graph();
  graphVertices = [];
  for (let i = 0; i < h; i++) {
    const row = document.createElement("tr");
    const row_graph = [];
    // row.className = `row-${i}`;
    for (let j = 0; j < w; j++) {
      const col = document.createElement("td");
      col.id = `${i}-${j}`;
      col.className = "unvisited";
      const a = `${Math.floor(h / 2)}-${Math.floor(w / 4)}`;
      const b = `${Math.floor(h / 2)}-${Math.floor(w / 1.4)}`;

      if (col.id == a) {
        col.className = "start";
      } else if (col.id == b) {
        col.className = "end";
      }
      row_graph.push(tableGraph.addVertex(`${col.id}`));
      row.appendChild(col);
    }
    graphVertices.push(row_graph);
    tableID.appendChild(row);
  }
  mergeVertices();
};
generateTable();

// TODO HANDLE GRID WHEN SOME VERTICES DO NOT EXIST THEY CANT BE MERGED
// WITH VERTICES -> e.g "2-4" with "2-5" if 2-5 IS A WALL.
function mergeVertices() {
  // ORDER: LEFT -> UP -> DOWN -> RIGHT
  // NEW ORDER: UP -> RIGHT -> DOWN -> LEFT
  // If row 0
  // If first col => down & right;
  // If last col => down & left;
  // else (middle Cols) => right, left & down

  // If last row
  // If first col => right & up
  // If last col => left & up
  // else (middle cols) => right, left & up

  // middle rows
  // else => left, right, up & down;
  for (let rowNum = 0; rowNum < graphVertices.length; rowNum++) {
    for (let vertex = 0; vertex < graphVertices[rowNum].length; vertex++) {
      const data = graphVertices[rowNum][vertex].data;
      const currentVertex = graphVertices[rowNum][vertex];
      // We are at a vertex wall, so skip
      if (document.getElementById(currentVertex.data).className == "wall") {
        continue;
      }
      const lengthOfVerticesInRow = graphVertices[rowNum].length - 1;
      if (rowNum === 0) {
        const rightVertex = graphVertices[rowNum][vertex + 1];
        const downVertex = graphVertices[rowNum + 1][vertex];
        const leftVertex = graphVertices[rowNum][vertex - 1];
        if (vertex === 0) {
          //FIRST COLUMN
          // weird here organization
          merge(currentVertex, rightVertex);
          merge(currentVertex, downVertex);
          // currentVertex.addEdge(rightVertex, 1, currentVertex);
          // currentVertex.addEdge(downVertex, 1, currentVertex);
        } else if (vertex === lengthOfVerticesInRow) {
          merge(currentVertex, downVertex);
          merge(currentVertex, leftVertex);
          // currentVertex.addEdge(downVertex, 1, currentVertex);
          // currentVertex.addEdge(leftVertex, 1, currentVertex);
        } else {
          merge(currentVertex, rightVertex);
          merge(currentVertex, downVertex);
          merge(currentVertex, leftVertex);
          // currentVertex.addEdge(rightVertex, 1, currentVertex);
          // currentVertex.addEdge(downVertex, 1, currentVertex);
          // currentVertex.addEdge(leftVertex, 1, currentVertex);
        }
      } else if (rowNum === graphVertices.length - 1) {
        // const currentVertex = graphVertices[rowNum][vertex];

        const rightVertex = graphVertices[rowNum][vertex + 1];
        const upVertex = graphVertices[rowNum - 1][vertex];
        const leftVertex = graphVertices[rowNum][vertex - 1];
        if (vertex === 0) {
          merge(currentVertex, upVertex);
          merge(currentVertex, rightVertex);
          // currentVertex.addEdge(upVertex, 1, currentVertex);
          // currentVertex.addEdge(rightVertex, 1, currentVertex);
        } else if (vertex === lengthOfVerticesInRow) {
          merge(currentVertex, upVertex);
          merge(currentVertex, leftVertex);
          // currentVertex.addEdge(upVertex, 1, currentVertex);
          // currentVertex.addEdge(leftVertex, 1, currentVertex);
        } else {
          merge(currentVertex, upVertex);
          merge(currentVertex, rightVertex);
          merge(currentVertex, leftVertex);
          // currentVertex.addEdge(upVertex, 1, currentVertex);
          // currentVertex.addEdge(rightVertex, 1, currentVertex);
          // currentVertex.addEdge(leftVertex, 1, currentVertex);
        }
      } else {
        // UP -> RIGHT -> DOWN -> LEFT
        // const currentVertex = graphVertices[rowNum][vertex];
        const upVertex = graphVertices[rowNum - 1][vertex];
        const rightVertex = graphVertices[rowNum][vertex + 1];
        const leftVertex = graphVertices[rowNum][vertex - 1];
        const downVertex = graphVertices[rowNum + 1][vertex];
        if (vertex === 0) {
          merge(currentVertex, upVertex);
          merge(currentVertex, rightVertex);
          merge(currentVertex, downVertex);
          // currentVertex.addEdge(upVertex, 1, currentVertex);
          // currentVertex.addEdge(rightVertex, 1, currentVertex);
          // currentVertex.addEdge(downVertex, 1, currentVertex);
        } else if (vertex === lengthOfVerticesInRow) {
          merge(currentVertex, upVertex);
          merge(currentVertex, downVertex);
          merge(currentVertex, leftVertex);
          // currentVertex.addEdge(upVertex, 1, currentVertex);
          // currentVertex.addEdge(downVertex, 1, currentVertex);
          // currentVertex.addEdge(leftVertex, 1, currentVertex);
        } else {
          merge(currentVertex, upVertex);
          merge(currentVertex, rightVertex);
          merge(currentVertex, downVertex);
          merge(currentVertex, leftVertex);
          // currentVertex.addEdge(upVertex, 1, currentVertex);
          // currentVertex.addEdge(rightVertex, 1, currentVertex);
          // currentVertex.addEdge(downVertex, 1, currentVertex);
          // currentVertex.addEdge(leftVertex, 1, currentVertex);
        }
      }
    }
  }
}
