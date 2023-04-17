import { velocity } from "../../creator.js";
var h = 25;
var w = 40;
export var grid = new Array(h);

var path = [];
function removeFromArray(arr, element) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == element) {
      arr.splice(i, 1);
    }
  }
}
function manhattanDistance(nodeOne, nodeTwo) {
  let nodeOneCoordinates = nodeOne.id.split("-").map((ele) => parseInt(ele));
  let nodeTwoCoordinates = nodeTwo.id.split("-").map((ele) => parseInt(ele));
  let xOne = nodeOneCoordinates[0];
  let xTwo = nodeTwoCoordinates[0];
  let yOne = nodeOneCoordinates[1];
  let yTwo = nodeTwoCoordinates[1];

  let xChange = Math.abs(xOne - xTwo);
  let yChange = Math.abs(yOne - yTwo);

  return xChange + yChange;
}
export function updateField(row, col) {
  console.log("--");
  console.log(grid[row][col]);
  if (grid[row][col].isWall == false) {
    grid[row][col].isWall = true;
  } else {
    grid[row][col].isWall = false;
  }
}
function reconstruct_path(cameFrom, current) {
  let total_path = [current];
  while (current in cameFrom) {
    current = cameFrom[current];
    total_path.unshift(current);
  }

  return total_path;
}
function mergeNeighbors() {
  // ADD NEIGHTBORS

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      // Avoid mergin with spots that are walls
      if (grid[i][j].isWall === true) {
        continue;
      }
      grid[i][j].addNeighbors(grid);
    }
  }
}

function Spot(i, j, id) {
  this.i = i; //height
  this.j = j; // width
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.id = id;
  this.previous = undefined;
  this.neighbors = [];
  this.isWall = false;
  this.addNeighbors = function (grid) {
    let i = this.i;
    let j = this.j;

    // up right down left
    if (i > 0 && grid[i - 1][j].isWall === false) {
      // up
      this.neighbors.push(grid[i - 1][j]);
    }

    if (i < h - 1 && grid[i + 1][j].isWall === false) {
      // down
      this.neighbors.push(grid[i + 1][j]);
    }

    if (j < w - 1 && grid[i][j + 1].isWall === false) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0 && grid[i][j - 1].isWall === false) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}

export function generateAstarTable(width, height) {
  h = height;
  w = width;

  grid = [];
  for (let i = 0; i < height; i++) {
    grid[i] = new Array(width);
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      grid[i][j] = new Spot(i, j, `${i}-${j}`);
    }
  }
  console.log(grid);
  return grid;
}
generateAstarTable(w, h);

export function Astar(start, end) {
  mergeNeighbors();

  let openSet = [];
  let pathToColor = [];

  let cameFrom = {};

  grid.forEach((row) => {
    row.forEach((spot) => {
      spot.g = Infinity;
    });
  });

  grid.forEach((row) => {
    row.forEach((spot) => {
      spot.f = Infinity;
    });
  });
  start.g = 0;
  start.f = manhattanDistance(start, end);
  openSet.push(start);

  let currentNode;
  while (openSet.length > 0) {
    let winner;
    let currentF = Infinity;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < currentF) {
        currentF = openSet[i].f;
        winner = openSet[i];
        currentNode = winner;
      }
    }
    if (winner == end) {
      return [pathToColor, reconstruct_path(cameFrom, winner.id)];
    }
    removeFromArray(openSet, winner);
    pathToColor.push(winner.id);

    winner.neighbors.forEach((elem) => {
      const tempScore = winner.g + 1;
      if (tempScore < elem.g) {
        cameFrom[elem.id] = winner.id;
        elem.g = tempScore;
        elem.f = tempScore + manhattanDistance(elem, end);
        if (!openSet.includes(elem)) {
          openSet.push(elem);
        }
      }
    });
  }

  return [pathToColor, reconstruct_path(cameFrom, currentNode.id)];
}

export function useAstar(start, end) {
  const [row1, col1] = start.split("-");
  const [row2, col2] = end.split("-");
  start = grid[row1][col1];
  end = grid[row2][col2];
  const [animations, shortestDistance] = Astar(start, end);

  shortestDistance.forEach((el) => {
    animations.push(`$${el}`);
  });

  for (let i = 0; i < animations.length; i++) {
    setTimeout(() => {
      const field = animations[i];
      const idShortestPath = animations[i].slice(1);
      if (field[0] !== "$" && field != start.id && field != end.id) {
        document.getElementById(`${animations[i]}`).className = "visited";
      } else if (
        field[0] == "$" &&
        idShortestPath != start.id &&
        idShortestPath != end.id
      ) {
        document.getElementById(`${idShortestPath}`).className =
          "shortest-path";
      }
    }, i * velocity);
  }
}
