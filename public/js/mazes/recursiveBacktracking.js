import * as creator from "../creator.js";
import { Graph } from "../algos/DS/Graph.js";

function recursiveBacktracking(maze, x, y, WIDTH, HEIGHT) {
  const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]; // Right, Left, Down, Up

  // Shuffle directions
  DIRECTIONS.sort(() => Math.random() - 0.5);

  for (let [dx, dy] of DIRECTIONS) {
    let nx = x + 2 * dx,
      ny = y + 2 * dy;

    if (nx >= 0 && ny >= 0 && nx < HEIGHT && ny < WIDTH && maze[nx][ny]) {
      maze[nx][ny] = maze[nx - dx][ny - dy] = 0;
      recursiveBacktracking(maze, nx, ny, WIDTH, HEIGHT);
    }
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
export function useRecursiveBacktracking(start, end) {
  const WIDTH = Number(document.getElementById("myWidth").value);
  const HEIGHT = Number(document.getElementById("myHeight").value);

  let maze = new Array(HEIGHT).fill(0).map(() => new Array(WIDTH).fill(1));

  // get the start and end ids

  let idStart = start.split("-");
  let idEnd = end.split("-");
  let startRow = Number(idStart[0]);
  let startCol = Number(idStart[1]);
  let endRow = Number(idEnd[0]);
  let endCol = Number(idEnd[1]);

  recursiveBacktracking(maze, startRow, startCol, WIDTH, HEIGHT);

  maze[0][0] = 0;
  maze[HEIGHT - 1][WIDTH - 1] = 0;

  maze[startRow][startCol] = 0;
  maze[endRow][endCol] = 0;

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
