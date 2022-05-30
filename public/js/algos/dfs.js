import * as graph from "./DS/Graph.js";
import * as creator from "../creator.js";
import { velocity } from "../creator.js";

let isTargetFound = false;

export function depthFirstTraversal(start, end, visitedVertices = []) {
  if (start.data === end.data) {
    isTargetFound = true;
  }

  if (end.data == start.data) {
    isTargetFound = true;
    return;
  }

  start.edges.forEach((edge) => {
    const neighbor = edge.end;

    if (!visitedVertices.includes(neighbor) && !isTargetFound) {
      visitedVertices.push(neighbor);
      depthFirstTraversal(neighbor, end, visitedVertices);
    }
  });

  return visitedVertices;
}

export function useDepthFirstTraversal(start, target) {
  isTargetFound = false;

  const animations = depthFirstTraversal(
    creator.tableGraph.getVertexByValue(start),
    creator.tableGraph.getVertexByValue(target)
  );

  const pathAnimation = getShortestPathDFS(animations);

  let time = animations.length;

  for (let i = 0; i < animations.length; i++) {
    setTimeout(() => {
      const getDataFromVertex = animations[i].data;
      let vertex = document.getElementById(`${getDataFromVertex}`);

      if (
        vertex.id === start ||
        vertex.id === target ||
        vertex.className == "wall"
      ) {
      } else {
        vertex.className = "visited";
        vertex.style.borderColor = "white";
      }

      time--;
      console.log(time);
      if (time === 0) {
        for (let idx = 0; idx < pathAnimation.length; idx++) {
          let index = pathAnimation[idx].slice(1);
          if (index === start || index === target) continue;
          setTimeout(() => {
            document.getElementById(`${index}`).className = "shortest-path";
          }, idx * (velocity + 20));
        }
      }
    }, i * velocity);
  }
}

function getShortestPathDFS(array) {
  let animations = [];
  for (let i = 0; i < array.length; i++) {
    const val = array[i].data;
    animations.push(`$${val}`);
  }
  return animations;
}
