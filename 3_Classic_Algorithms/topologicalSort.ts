/**
 * Topological Sort orders the nodes according to their position in the graph.
 * Only works on Directional Acyclic Graphs (DAGs)
 */

import { createAdjacencyList } from "./trees.ts";

/**
 * Expects a adjacency list.
 * @param graph
 * @returns List of numbers indicating positions of nodes in graph.
 */
const topologicalSort = (graph: number[][]) => {
  const num_nodes = graph.length;
  const visited = Array(num_nodes).fill(false);
  const ordering: number[] = []; // This will be the final order we determine

  // Go through each node. If not visited, perform depth-first search
  for (let at = 0; at < num_nodes; at++) {
    if (!visited[at]) {
      dfs(at, visited, ordering, graph);
    }
  }

  return ordering;
};

// Depth-first search algorithm
// Works because visited and ordering are references to original, not just copies
const dfs = (
  at: number,
  visited: boolean[],
  ordering: number[],
  graph: number[][]
) => {
  // We've now visited this node
  visited[at] = true;
  const edges = graph[at];
  // For any edges, if not visited, continue dfs
  edges.forEach((edge) => {
    if (!visited[edge]) {
      dfs(edge, visited, ordering, graph);
    }
  });
  ordering.unshift(at); // Stick this node to near end of ordering list. 
};

const result = topologicalSort(createAdjacencyList());
console.assert(result.length == 13);
console.assert(result.at(-1) == 11);
console.assert(result.at(0) == 4);
