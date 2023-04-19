import { velocity } from "../../creator.js";
export async function startAnimation(visitedNodes, shortestPath) {
  const disableRunButton = document.getElementById("runButton");
  const disableResetButton = document.getElementById("resetButton");

  disableRunButton.disabled = true;
  disableResetButton.disabled = true;

  // Animate visited nodes
  for (let i = 0; i < visitedNodes.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        const node = document.getElementById(visitedNodes[i]);
        node.className = "visited";
        node.style.borderColor = "white";
        resolve();
      }, velocity);
    });
  }

  // Wait for 1 second before animating the shortest path
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  // Animate shortest path
  for (let i = 0; i < shortestPath.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        const node = document.getElementById(shortestPath[i]);
        node.className = "shortest-path";
        resolve();
      }, velocity);
    });
  }

  // Re-enable button or other UI elements here
  disableRunButton.disabled = false;
  disableResetButton.disabled = false;
}
