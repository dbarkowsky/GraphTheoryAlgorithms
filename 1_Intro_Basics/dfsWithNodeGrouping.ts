/**
 * Similar to the depth-first search that uses recursion.
 * Also tracks which nodes happened to be interconnected.
 */

import { createGraphWithGroups } from "./createGraphWithGroups.ts";

// Setup for making array and tracking visited, groups, etc
const graph = createGraphWithGroups();
let count = 0; // A number assigned to a group of nodes
const components = Array(graph.length); // Empty
const visited = Array(graph.length).fill(false);

const findComponents = () => {
  for (let i = 0; i < graph.length; i++) {
    if (!visited[i]) {
      // We haven't visited this node before. It's a new group/cluster.
      count++;
      // DFS to explore all nodes in that group.
      depthFirstSearch(i);
    }
  }
  return {
    count, components
  }
}

const depthFirstSearch = (at: number) => {
  // Mark this node as visited
  visited[at] = true;
  // Assign the group number to this node
  components[at] = count;
  // Get Edges/Neighbours
  const neighbours = graph[at];
  neighbours.forEach(edge => {
    // Only visit the next edge if we haven't already
    if (!visited[edge])
      depthFirstSearch(edge);
  });
}

const result = findComponents();
// We should expect 3 groups.
console.assert(result.count === 3);
// There should be two nodes in group 1
console.assert(result.components.filter(c => c === 1).length === 2);
// Three nodes in group 2
console.assert(result.components.filter(c => c === 2).length === 3);
// Four nodes in group 3
console.assert(result.components.filter(c => c === 3).length === 4);
// All nodes were visited
console.assert(visited.every(n => n));
