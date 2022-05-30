function removeFromArray(arr, element) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == element) {
      arr.splice(i, 1);
    }
  }
}
function heuristic(a, b) {
  let d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
  return d;
}
var cols = 45;
var rows = 25;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];
function Spot(i, j, id) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.id = id;
  this.previous = undefined;
  this.neighbors = [];
  this.addNeighbors = function (grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}
function Astar() {
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j, `${i}-${j}`);
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[11][12];
  end = grid[12][32];

  console.log(start, end);
  //   return;
  openSet.push(start);
  let endPoint;
  while (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    let current = openSet[winner];
    if (current === end) {
      endPoint = current;
      console.log("DONE!");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neightbors = current.neighbors;
    console.log(current, "ss");
    for (let i = 0; i < neightbors.length; i++) {
      let neighbor = neightbors[i];
      console.log(neighbor);
      if (!closedSet.includes(neighbor)) {
        let tempG = current.g + 1;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }
      }
      path.push(neighbor.previous);
      neighbor.h = heuristic(neighbor, end);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.previous = current;
    }
  }
  let temp = endPoint;

  return path;
}

const animations = Astar();

const ids = [];
for (let i = 0; i < animations.length; i++) {
  if (animations[i]) {
    ids.push(animations[i].id);
  }
}

for (let i = 0; i < ids.length; i++) {
  setTimeout(() => {
    document.getElementById(`${ids[i]}`).style.background = "blue";
  }, i * 2);
}
console.log(ids);
