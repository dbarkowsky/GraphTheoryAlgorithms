/**
 * Breadth-first search using a queue.
 */

import { createSimpleGraph } from "./createSimpleGraph.ts";

const graph = createSimpleGraph();

export const simpleBfsQueue = (graph: number[][], start: number) => {
  // Track which nodes we already visited
  const visited = Array(graph.length).fill(false);
  const queue = [];

  // Begin having visited the starting node
  visited[start] = true;
  // Add this node to the queue
  queue.push(start);

  // As long as there's something in the queue
  while (queue.length) {
    // Take something off the queue
    const current: number = queue.shift()!;

    // If looking for a specific node, could return that here.
    
    // Get vertices of node. Add to queue if unvisited
    for (const node of graph[current]) {
      if (!visited[node]) {
        visited[node] = true;
        queue.push(node);
      }
    }
  }

  // When the node is run out, the queue should be empty and 
  // all nodes visited.
  console.assert(visited.every(n => n));
}

simpleBfsQueue(graph, 0);
