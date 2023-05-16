import * as creator from "../creator.js";
import { Graph } from "../algos/DS/Graph.js";

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isValidMove(maze, height, width, row, col) {
  if (row < 0 || row >= height || col < 0 || col >= width) {
    return false;
  }
  return maze[row][col] === 1;
}

// function huntAndKill(height, width, startX, startY, endX, endY) {
//   // Initialize maze with all walls (all cells set to 1).
//   let maze = Array(height)
//     .fill()
//     .map(() => Array(width).fill(1));

//   // Start at a random cell.
//   let currentRow = startX;
//   let currentCol = startY;
//   maze[currentRow][currentCol] = 0;

//   while (true) {
//     // Kill phase: Random walk and carve a path (set to 0) until we reach a cell where we have no unvisited neighbours.
//     while (true) {
//       let unvisitedNeighbours = DIRECTIONS.filter(([dx, dy]) =>
//         isValidMove(
//           maze,
//           height,
//           width,
//           currentRow + dx * 2,
//           currentCol + dy * 2
//         )
//       );
//       if (!unvisitedNeighbours.length) {
//         break;
//       }

//       // Choose a random unvisited neighbour and move to it.
//       let [dx, dy] = getRandomElement(unvisitedNeighbours);
//       maze[currentRow + dx][currentCol + dy] = maze[currentRow + dx * 2][
//         currentCol + dy * 2
//       ] = 0;
//       currentRow += dx * 2;
//       currentCol += dy * 2;
//     }

//     // Hunt phase: Find the next cell with unvisited neighbours. If no such cell exists, the algorithm has finished.
//     let found = false;
//     for (let row = 0; row < height; row++) {
//       for (let col = 0; col < width; col++) {
//         let unvisitedNeighbours = DIRECTIONS.filter(([dx, dy]) =>
//           isValidMove(maze, height, width, row + dx * 2, col + dy * 2)
//         );
//         if (maze[row][col] === 0 && unvisitedNeighbours.length) {
//           // Choose a random unvisited neighbour and move to it, then continue the kill phase.
//           let [dx, dy] = getRandomElement(unvisitedNeighbours);
//           maze[row + dx][col + dy] = maze[row + dx * 2][col + dy * 2] = 0;
//           currentRow = row + dx * 2;
//           currentCol = col + dy * 2;
//           found = true;
//           break;
//         }
//       }
//       if (found) {
//         break;
//       }
//     }
//     // Ensure the end point is accessible
//     for (const [dx, dy] of DIRECTIONS) {
//       const newRow = endX + dx;
//       const newCol = endY + dy;
//       if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
//         maze[newRow][newCol] = 0;
//       }
//     }
//     console.log(maze);
//     maze[startX][startY] = 0;
//     maze[endX][endY] = 0;
//     return maze;
//   }
// }

function huntAndKill(height, width, startX, startY, endX, endY) {
  // Initialize maze with all walls (all cells set to 1).
  let maze = Array(height)
    .fill()
    .map(() => Array(width).fill(1));

  // Start at a random cell.
  let currentRow = startX;
  let currentCol = startY;
  maze[currentRow][currentCol] = 0;

  while (true) {
    // Kill phase: Random walk and carve a path (set to 0) until we reach a cell where we have no unvisited neighbours.
    while (true) {
      let unvisitedNeighbours = DIRECTIONS.filter(([dx, dy]) =>
        isValidMove(
          maze,
          height,
          width,
          currentRow + dx * 2,
          currentCol + dy * 2
        )
      );
      if (!unvisitedNeighbours.length) {
        break;
      }

      // Choose a random unvisited neighbour and move to it.
      let [dx, dy] = getRandomElement(unvisitedNeighbours);
      maze[currentRow + dx][currentCol + dy] = maze[currentRow + dx * 2][
        currentCol + dy * 2
      ] = 0;
      currentRow += dx * 2;
      currentCol += dy * 2;
    }

    // Hunt phase: Find the next cell with unvisited neighbours. If no such cell exists, the algorithm has finished.
    let found = false;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        let unvisitedNeighbours = DIRECTIONS.filter(([dx, dy]) =>
          isValidMove(maze, height, width, row + dx * 2, col + dy * 2)
        );
        if (maze[row][col] === 0 && unvisitedNeighbours.length) {
          // Choose a random unvisited neighbour and move to it, then continue the kill phase.
          let [dx, dy] = getRandomElement(unvisitedNeighbours);
          maze[row + dx][col + dy] = maze[row + dx * 2][col + dy * 2] = 0;
          currentRow = row + dx * 2;
          currentCol = col + dy * 2;
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    if (!found) {
      break;
    }
  }

  // Ensure the end point is accessible
  for (const [dx, dy] of DIRECTIONS) {
    const newRow = endX + dx;
    const newCol = endY + dy;
    if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
      maze[newRow][newCol] = 0;
    }
  }

  maze[startX][startY] = 0;
  maze[endX][endY] = 0;
  console.log(maze);
  return maze;
}

export function useHuntAndKill(start, end) {
  const WIDTH = Number(document.getElementById("myWidth").value);
  const HEIGHT = Number(document.getElementById("myHeight").value);

  let idStart = start.split("-");
  let idEnd = end.split("-");
  let startRow = Number(idStart[0]);
  let startCol = Number(idStart[1]);
  let endRow = Number(idEnd[0]);
  let endCol = Number(idEnd[1]);

  let maze = huntAndKill(HEIGHT, WIDTH, startRow, startCol, endRow, endCol);
  const animations = getAnimationWalls(maze);
  console.log(animations);
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
