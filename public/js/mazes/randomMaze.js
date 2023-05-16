import * as creator from "../creator.js";
import { Graph } from "../algos/DS/Graph.js";

export function useRandomMaze(start, end) {
  let width = Number(document.getElementById("myWidth").value);
  let height = Number(document.getElementById("myHeight").value);
  let artificialGrid = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(1));

  let count = Math.floor(width * height * 0.3);
  let animations = getRandomPositions(artificialGrid, count, start, end);

  for (let i = 0; i < animations.length; i++) {
    (function (i) {
      setTimeout(function () {
        console.log(animations[i]);
        document.getElementById(animations[i]).className = "wall";
        if (i === animations.length - 1) {
          updateGraph();
        }
      }, i * 50); // Change this value to adjust the speed of the animation
    })(i);
  }
}

function getRandomPositions(matrix, count, start, end) {
  // Generate list of all positions

  let positions = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      positions.push([i, j]);
    }
  }

  // Shuffle the array
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]]; // Swap
  }

  // Return the first 'count' positions
  let output = positions.slice(0, count);

  let final = [];
  for (let i = 0; i < output.length; i++) {
    const [row, col] = output[i];
    if (`${row}-${col}` != start && `${row}-${col}` != end) {
      final.push(`${row}-${col}`);
    }
  }
  console.log(output);
  return final;
}

function updateGraph() {
  const newTableGraph = new Graph();
  const newGraphVertices = [];
  const w = Number(document.getElementById("myWidth").value);
  const h = Number(document.getElementById("myHeight").value);
  for (let i = 0; i < h; i++) {
    const rowGraph = [];
    for (let j = 0; j < w; j++) {
      rowGraph.push(newTableGraph.addVertex(`${i}-${j}`));
    }
    newGraphVertices.push(rowGraph);
  }
  creator.updateGraph(newTableGraph, newGraphVertices);
}
