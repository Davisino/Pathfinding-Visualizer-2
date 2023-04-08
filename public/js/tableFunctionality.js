import { generateAstarTable } from "./algos/astar/astar.js";
import { Graph } from "./algos/DS/Graph.js";
import * as creator from "./creator.js";
import * as astar from "./algos/astar/astar.js";
// CLEAR TABLE

// OPTIMIZED SOLUTION
export function generateNewRandomTargets() {
  const currentUnvisitedNodes = [];
  const nodes = document.getElementsByClassName("unvisited");

  for (let element of nodes) {
    currentUnvisitedNodes.push(element.id);
  }
  // COULD HAPPEND THAT BOTH ARE THE SAME START AND END BUT VERY UNLIKELY
  // TO DO THIS WE SHOULD ELIMINATE THE FIRST NODE PICKED.
  console.log(currentUnvisitedNodes);
  const startIdx = Math.floor(Math.random() * currentUnvisitedNodes.length);
  const newStart = currentUnvisitedNodes[startIdx];

  currentUnvisitedNodes[startIdx] =
    currentUnvisitedNodes[currentUnvisitedNodes.length - 1];
  currentUnvisitedNodes.pop();
  const newEnd =
    currentUnvisitedNodes[
      Math.floor(Math.random() * currentUnvisitedNodes.length)
    ];

  const currStart = document.getElementsByClassName("start")[0];
  const currEnd = document.getElementsByClassName("end")[0];
  if (currStart) {
    document.getElementsByClassName("start")[0].className = "unvisited";
  }
  if (currEnd) {
    document.getElementsByClassName("end")[0].className = "unvisited";
  }
  // ESTABLISH NEW START AND NEW END
  document.getElementById(newStart).className = "start";
  document.getElementById(newEnd).className = "end";
}

// PAINTING GRID WITH OBSTACLES OR WALLS
const table = document.querySelector("table");
let mouseIsDown = false;

export const colorTd = (e) => {
  // ALTER A* Table grid

  const [row, col] = e.target.id.split("-");

  astar.updateField(Number(row), Number(col));

  if (e.target.className == "start" || e.target.className == "end") {
    return;
  }
  if (e.target.tagName === "TD") {
    if (e.target.className === "unvisited") {
      e.target.className = "wall";
    } else {
      e.target.className = "unvisited";
    }
  }

  // REPLACE TABLE WITH UPDATED UNVISITED NODES
  const newTableGraph = new Graph();
  const newGraphVertices = [];
  const w = Number(document.getElementById("myWidth").value);
  const h = Number(document.getElementById("myHeight").value);
  for (let i = 0; i < h; i++) {
    const rowGraph = [];
    for (let j = 0; j < w; j++) {
      // const isWall =
      //   document.getElementById(`${i}-${j}`).className == "wall" ? true : false;
      // if (!isWall) {
      rowGraph.push(newTableGraph.addVertex(`${i}-${j}`));
      // }
    }
    newGraphVertices.push(rowGraph);
  }
  creator.updateGraph(newTableGraph, newGraphVertices);
};

table.onmousedown = (e) => (mouseIsDown = true);
table.onmouseup = () => (mouseIsDown = false);
table.onmouseover = (e) => mouseIsDown && colorTd(e);

// MOVE START AND END
