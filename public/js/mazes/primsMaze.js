import * as creator from "../creator.js";
import { Graph } from "../algos/DS/Graph.js";
const DIRECTIONS = [
  [0, 2],
  [0, -2],
  [2, 0],
  [-2, 0],
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function primsAlgorithm(height, width, startX, startY, endX, endY) {
  // Initialize maze with all walls (all cells set to 1).
  let maze = Array(height)
    .fill()
    .map(() => Array(width).fill(1));
  let walls = [];

  // Start with a random cell, mark it as path (set to 0).
  let startRow = startX;
  let startCol = startY;
  maze[startRow][startCol] = 0;

  // Add the neighboring walls of the initial cell to the wall list.
  DIRECTIONS.forEach(([dx, dy]) => {
    let newRow = startRow + dx;
    let newCol = startCol + dy;

    if (newRow > 0 && newRow < height && newCol > 0 && newCol < width) {
      walls.push([newRow, newCol, [startRow, startCol]]);
    }
  });

  while (walls.length) {
    // Pick a random wall from the list. If only one of the two cells divided by the wall is visited, mark the wall and the other cell as paths.
    let [row, col, [prevRow, prevCol]] = getRandomElement(walls);
    let index = walls.findIndex((wall) => wall[0] === row && wall[1] === col);

    walls.splice(index, 1);

    let nextRow = prevRow + (row - prevRow) / 2;
    let nextCol = prevCol + (col - prevCol) / 2;

    if (maze[row][col] && maze[nextRow][nextCol]) {
      maze[row][col] = maze[nextRow][nextCol] = 0;

      DIRECTIONS.forEach(([dx, dy]) => {
        let newRow = row + dx;
        let newCol = col + dy;

        if (
          newRow > 0 &&
          newRow < height &&
          newCol > 0 &&
          newCol < width &&
          maze[newRow][newCol]
        ) {
          walls.push([newRow, newCol, [row, col]]);
        }
      });
    }
  }

  // Set start and end points
  maze[startX][startY] = 0;
  maze[endX][endY] = 0;

  return maze;
}

export function usePrimsMaze(start, end) {
  const WIDTH = Number(document.getElementById("myWidth").value);
  const HEIGHT = Number(document.getElementById("myHeight").value);

  let idStart = start.split("-");
  let idEnd = end.split("-");
  let startRow = Number(idStart[0]);
  let startCol = Number(idStart[1]);
  let endRow = Number(idEnd[0]);
  let endCol = Number(idEnd[1]);

  let maze = primsAlgorithm(HEIGHT, WIDTH, startRow, startCol, endRow, endCol);
  const animations = getAnimationWalls(maze);

  for (let i = 0; i < animations.length; i++) {
    // Use a closure to capture the current value of i
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

// Log the maze
function getAnimationWalls(maze) {
  let walls = [];
  let end = document.getElementsByClassName("end")[0].id;
  let start = document.getElementsByClassName("start")[0].id;
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] == 1 && `${i}-${j}` != end && `${i}-${j}` != start) {
        walls.push(`${i}-${j}`);
      }
    }
  }
  return walls;
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
