import * as tableFunctionality from "./tableFunctionality.js";
import { updateWidthAndHeight } from "./updateWidth.js";
import { useDepthFirstTraversal } from "./algos/dfs.js";
import { updateVelocity } from "./creator.js";
import { useDijkstras } from "./algos/dijkstras.js";
import { useAstar } from "./algos/astar/astar.js";
import { useGreedyBfs } from "./algos/greedyBFS.js";
import { generateTable } from "./creator.js";
import { useRecursiveDivision } from "./mazes/recursiveDivision.js";
import { useRecursiveBacktracking } from "./mazes/recursiveBacktracking.js";
let selectedAlgorithm = {
  "dfs-btn": false,
  "dijkstra-btn": false,
  "bfs-btn": false,
  "astar-btn": false,
  "greedyBfs-btn": false,
};

let selectedMazeAlgorithm = {
  "recursiveDivision-btn": false,
  "recursiveBacktracking-btn": false,
  maze3: false,
  maze4: false,
  maze5: false,
};

function updateSelectedMazeAlgo(algo) {
  for (const key in selectedMazeAlgorithm) {
    if (key != algo) {
      selectedAlgorithm[key] = false;
    }
  }
  const maze_algo_to_run = document.getElementById(algo).innerHTML;
  document.getElementById("deploy-maze").innerHTML = maze_algo_to_run;
  selectedMazeAlgorithm[algo] = true;
}

function updateSelectedAlgo(algo) {
  for (const key in selectedAlgorithm) {
    if (key != algo) {
      selectedAlgorithm[key] = false;
    }
  }
  const algo_to_run = document.getElementById(algo).innerHTML;
  document.getElementById("deploy-algo").innerHTML = algo_to_run;
  selectedAlgorithm[algo] = true;
}

function toggleDropdown(id) {
  document.getElementById(id).classList.toggle("show");
}

document.addEventListener("click", function (event) {
  if (event.target.closest("#algo-nav")) {
    toggleDropdown("algo-dropdown");
  } else if (event.target.closest("#maze-nav")) {
    toggleDropdown("maze-dropdown");
  } else if (!event.target.closest(".dropdown")) {
    var dropdowns = document.getElementsByClassName("dropdown");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
});

document.getElementById("resetButton").addEventListener("click", () => {
  document.getElementById("grid").innerHTML = "";
  generateTable();
});

document
  .getElementById("myWidth")
  .addEventListener("change", updateWidthAndHeight);
document
  .getElementById("myHeight")
  .addEventListener("change", updateWidthAndHeight);

document.getElementById("myVelocity").addEventListener("change", () => {
  updateVelocity(Number(document.getElementById("myVelocity").value));
});
document.getElementById("editButton").addEventListener("click", function () {
  document.getElementById("miniUI").style.display = "block";
});

document.getElementById("closeMiniUI").addEventListener("click", function () {
  document.getElementById("miniUI").style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("miniUI")) {
    document.getElementById("miniUI").style.display = "none";
  }
});

document.getElementById("grid").addEventListener("click", (e) => {
  tableFunctionality.colorTd(e);
});

document
  .getElementById("recursiveDivision-btn")
  .addEventListener("click", () => {
    updateSelectedMazeAlgo("recursiveDivision-btn");
  });

document
  .getElementById("recursiveBacktracking-btn")
  .addEventListener("click", () => {
    updateSelectedMazeAlgo("recursiveBacktracking-btn");
  });

document.getElementById("maze3-btn").addEventListener("click", () => {
  updateSelectedMazeAlgo("maze3-btn");
});

document.getElementById("maze4-btn").addEventListener("click", () => {
  updateSelectedMazeAlgo("maze4-btn");
});

document.getElementById("maze5-btn").addEventListener("click", () => {
  updateSelectedMazeAlgo("maze5-btn");
});

document.getElementById("dfs-btn").addEventListener("click", () => {
  updateSelectedAlgo("dfs-btn");
});
document.getElementById("dijkstra-btn").addEventListener("click", () => {
  updateSelectedAlgo("dijkstra-btn");
});
document.getElementById("bfs-btn").addEventListener("click", () => {
  updateSelectedAlgo("bfs-btn");
});
document.getElementById("astar-btn").addEventListener("click", () => {
  updateSelectedAlgo("astar-btn");
});
document.getElementById("greedyBfs-btn").addEventListener("click", () => {
  updateSelectedAlgo("greedyBfs-btn");
});

document.getElementById("runButton").addEventListener("click", () => {
  let algoSelected = Object.keys(selectedAlgorithm).find(
    (key) => selectedAlgorithm[key] === true
  );
  if (!algoSelected) {
    alert("Select an algorithm first");
  }
  runAlgorithm(algoSelected);
});

document.getElementById("run-maze").addEventListener("click", () => {
  let mazeSelected = Object.keys(selectedMazeAlgorithm).find(
    (key) => selectedMazeAlgorithm[key] === true
  );
  if (!mazeSelected) {
    alert("Select a maze first");
  }
  runMazeAlgorithm(mazeSelected);
});

function runAlgorithm(algo) {
  const start = document.getElementsByClassName("start")[0].id;
  const end = document.getElementsByClassName("end")[0].id;
  if (algo == "dfs-btn") {
    useDepthFirstTraversal(start, end);
  } else if (algo == "dijkstra-btn") {
    useDijkstras(start, end);
  } else if (algo == "bfs-btn") {
    // NEED TO CHANGE TO BFS instead
    useDijkstras(start, end);
  } else if (algo == "astar-btn") {
    useAstar(start, end);
  } else if (algo == "greedyBfs-btn") {
    useGreedyBfs(start, end);
  }
}
function runMazeAlgorithm(maze) {
  const start = document.getElementsByClassName("start")[0].id;
  const end = document.getElementsByClassName("end")[0].id;
  if (maze == "recursiveDivision-btn") {
    useRecursiveDivision(start, end);
  } else if (maze == "recursiveBacktracking-btn") {
    console.log("s");
    useRecursiveBacktracking(start, end);
  } else if (maze == "maze3-btn") {
    // NEED TO CHANGE TO BFS instead
    useDijkstras(start, end);
  } else if (maze == "maze4-btn") {
    useAstar(start, end);
  } else if (maze == "maze5-btn") {
    useGreedyBfs(start, end);
  }
}

document.getElementById("editButton").addEventListener("click", function () {
  document.getElementById("miniUI").style.display = "block";
});

document.getElementById("closeMiniUI").addEventListener("click", function () {
  document.getElementById("miniUI").style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("miniUI")) {
    document.getElementById("miniUI").style.display = "none";
  }
});
