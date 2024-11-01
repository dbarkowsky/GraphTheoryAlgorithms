/**
 * Depth-first search that uses recursion.
 */

import { createSimpleGraph } from "./createSimpleGraph.ts";

// Setup for making array and tracking visited
const graph = createSimpleGraph();
const start = 0;
const visited = Array(graph.length).fill(false);

const depthFirstSearch = (at: number) => {
  // If visited already, don't go further
  if (visited[at]) return;
  // Else mark as visited
  visited[at] = true;

  // If looking for a specific node, can return that here.

  // Get Edges/Neighbours
  const neighbours = graph[at];
  neighbours.forEach(edge => {
    depthFirstSearch(edge);
  });
}

depthFirstSearch(start);

// All nodes should be visited at this point.
console.assert(visited.every(n => n));
