import * as creator from "./creator.js";
import * as tableFunctionality from "./tableFunctionality.js";
import { updateWidthAndHeight } from "./updateWidth.js";
import { useDepthFirstTraversal } from "./algos/dfs.js";
import { updateVelocity } from "./creator.js";
import { useDijkstras } from "./algos/dijkstras.js";
import { useAstar } from "./algos/astar/astar.js";
// import { useGreedyBfs } from "./algos/greedyBFS.js";

let selectedAlgorithm = {
  "dfs-btn": false,
  "dijkstra-btn": false,
  "bfs-btn": false,
  "astar-btn": false,
  "greedyBfs-btn": false,
};

function updateSelectedAlgo(algo) {
  for (const key in selectedAlgorithm) {
    if (key != algo) {
      selectedAlgorithm[key] = false;
    }
  }
  selectedAlgorithm[algo] = true;
}
function toggleDropdown() {
  document.getElementById("algo-dropdown").classList.toggle("show");
}

document.addEventListener("click", function (event) {
  if (event.target.closest(".nav-icon")) {
    toggleDropdown();
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

document
  .getElementById("myWidth")
  .addEventListener("change", updateWidthAndHeight);
document
  .getElementById("myHeight")
  .addEventListener("change", updateWidthAndHeight);

document.getElementById("myVelocity").addEventListener("change", () => {
  updateVelocity(Number(document.getElementById("myVelocity").value));
});

document.getElementById("grid").addEventListener("click", (e) => {
  tableFunctionality.colorTd(e);
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
    // development
  }
}
