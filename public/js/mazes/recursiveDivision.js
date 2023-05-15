import * as creator from "../creator.js";
import { Graph } from "../algos/DS/Graph.js";

function recursiveDivision(maze, minX, minY, maxX, maxY, orientation) {
  // Calculate the width and height
  const width = maxX - minX;
  const height = maxY - minY;

  // If the size of the maze is too small, return
  if (width < 2 || height < 2) {
    return;
  }

  // Choose a random line to divide the maze
  let divideLine;

  if (orientation === "H") {
    divideLine = Math.floor(Math.random() * (width - 2)) + minX + 1;

    // Make a hole in the wall
    const hole = Math.floor(Math.random() * height) + minY;

    for (let y = minY; y < maxY; y++) {
      if (y === hole) continue;
      maze[y][divideLine] = 0;
    }

    // Recursively divide the new mazes
    recursiveDivision(maze, minX, minY, divideLine, maxY, "V");
    recursiveDivision(maze, divideLine + 1, minY, maxX, maxY, "V");
  } else {
    divideLine = Math.floor(Math.random() * (height - 2)) + minY + 1;

    // Make a hole in the wall
    const hole = Math.floor(Math.random() * width) + minX;

    for (let x = minX; x < maxX; x++) {
      if (x === hole) continue;
      maze[divideLine][x] = 0;
    }

    // Recursively divide the new mazes
    recursiveDivision(maze, minX, minY, maxX, divideLine, "H");
    recursiveDivision(maze, minX, divideLine + 1, maxX, maxY, "H");
  }
}

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
export async function useRecursiveDivision(start, end) {
  const WIDTH = Number(document.getElementById("myWidth").value);
  const HEIGHT = Number(document.getElementById("myHeight").value);

  let maze = new Array(HEIGHT).fill(0).map(() => new Array(WIDTH).fill(1));
  recursiveDivision(maze, 0, 0, WIDTH, HEIGHT, "H");
  // get the start and end ids

  let idStart = start.split("-");
  let idEnd = end.split("-");
  let startRow = Number(idStart[0]);
  let startCol = Number(idStart[1]);
  let endRow = Number(idEnd[0]);
  let endCol = Number(idEnd[1]);

  maze[startRow][startCol] = 1;
  maze[endRow][endCol] = 1;
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
