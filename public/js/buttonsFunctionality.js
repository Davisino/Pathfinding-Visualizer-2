import * as creator from "./creator.js";
import * as tableFunctionality from "./tableFunctionality.js";
import { updateWidthAndHeight } from "./updateWidth.js";
import { useDepthFirstTraversal } from "./algos/dfs.js";
import { updateVelocity } from "./creator.js";
import { useDijkstras } from "./algos/dijkstras.js";
import { useAstar } from "./algos/astar/astar.js";
// import { useGreedyBfs } from "./algos/greedyBFS.js";
document
  .getElementById("myWidth")
  .addEventListener("change", updateWidthAndHeight);
document
  .getElementById("myHeight")
  .addEventListener("change", updateWidthAndHeight);

document.getElementById("myVelocity").addEventListener("change", () => {
  updateVelocity(Number(document.getElementById("myVelocity").value));
});

document.getElementById("random-target-btn").addEventListener("click", () => {
  tableFunctionality.generateNewRandomTargets();
});

document.getElementById("grid").addEventListener("click", (e) => {
  tableFunctionality.colorTd(e);
});

document.getElementById("dfs-btn").addEventListener("click", () => {
  const start = document.getElementsByClassName("start")[0].id;
  const end = document.getElementsByClassName("end")[0].id;
  useDepthFirstTraversal(start, end);
});
document.getElementById("dijkstra-btn").addEventListener("click", () => {
  const start = document.getElementsByClassName("start")[0].id;
  const end = document.getElementsByClassName("end")[0].id;
  useDijkstras(start, end);
});
document.getElementById("bfs-btn").addEventListener("click", () => {
  const start = document.getElementsByClassName("start")[0].id;
  const end = document.getElementsByClassName("end")[0].id;
  useDijkstras(start, end);
});
document.getElementById("astar-btn").addEventListener("click", () => {
  const start = document.getElementsByClassName("start")[0].id;
  const end = document.getElementsByClassName("end")[0].id;

  useAstar(start, end);
});

// document.getElementById("greedyBfs-btn").addEventListener("click", () => {
//   const start = document.getElementsByClassName("start")[0].id;
//   const end = document.getElementsByClassName("end")[0].id;

//   useGreedyBfs(start, end);
// });
