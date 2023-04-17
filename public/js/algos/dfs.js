import * as creator from "../creator.js";
import { startAnimation } from "./utils/startAnimation.js";

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
  const visitedNodesId = visitedVertices.map((x) => {
    return x.data;
  });
  return visitedNodesId;
}

export async function useDepthFirstTraversal(start, target) {
  isTargetFound = false;
  let animations = depthFirstTraversal(
    creator.tableGraph.getVertexByValue(start),
    creator.tableGraph.getVertexByValue(target)
  );
  animations = animations.filter((value) => {
    return value != start && value != target;
  });
  startAnimation(animations, animations);
  return;
}
