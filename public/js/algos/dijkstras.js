import { PriorityQueue } from "./DS/priorityQueue.js";
import * as creator from "../creator.js";
import { startAnimation } from "./utils/startAnimation.js";
export async function useDijkstras(start, end) {
  let [visitedNodes, path] = getShortestPathBetween(
    creator.tableGraph,
    creator.tableGraph.getVertexByValue(start),
    creator.tableGraph.getVertexByValue(end)
  );
  path = path.filter((value) => value != start && value != end);
  // Disable button or other UI elements here
  const disableButton = document.getElementById("runButton");
  disableButton.disabled = true;

  startAnimation(visitedNodes, path);
}

export const dijkstras = (graph, startingVertex) => {
  let animations = [];
  const distances = {};
  const previous = {};
  const queue = new PriorityQueue();

  queue.add({ vertex: startingVertex, priority: 0 });

  graph.vertices.forEach((vertex) => {
    distances[vertex.data] = Infinity;
    previous[vertex.data] = null;
  });

  distances[startingVertex.data] = 0;

  while (!queue.isEmpty()) {
    const { vertex } = queue.popMin();

    const box = document.getElementById(vertex.data);
    if (wasTargetPushed) {
      break;
    }
    animations.push(...findVerticesEdges(vertex, animations));
    vertex.edges.forEach((edge) => {
      const alternate = edge.weight + distances[vertex.data];
      const neighborValue = edge.end.data;

      if (alternate < distances[neighborValue]) {
        distances[neighborValue] = alternate;
        previous[neighborValue] = vertex;

        queue.add({ vertex: edge.end, priority: distances[neighborValue] });
      }
    });
  }

  wasTargetPushed = false;

  return { distances, previous, animations };
};

let wasTargetPushed = false;

function findVerticesEdges(vertex, animations) {
  let VerticesToColor = [];

  if (vertex.edges.length && wasTargetPushed === false) {
    vertex.edges.map((x) => {
      const box = document.getElementById(x.end.data);
      if (box.className === "end") {
        wasTargetPushed = true;
      }
      if (box.className === "unvisited" && animations.indexOf(box.id) === -1) {
        VerticesToColor.push(x.end.data);
      }
    });
  }
  return VerticesToColor;
}

export const getShortestPathBetween = (graph, startingVertex, targetVertex) => {
  const { previous, animations } = dijkstras(graph, startingVertex);
  const path = [];

  let vertex = targetVertex;
  while (vertex) {
    path.unshift(`${vertex.data}`);
    vertex = previous[vertex.data];
  }
  return [animations, path];
};
