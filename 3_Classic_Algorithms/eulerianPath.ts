/**
 * Eulerian Path Algorithm
 * This algorithm finds an Eulerian path in a directed graph if it exists.
 * An Eulerian path is a trail in a graph that visits every edge exactly once.
 * The algorithm uses depth-first search (DFS) to traverse the graph and construct the path.
 */

import { createGraphForEulerian } from './graphs.ts';

const eulerianPath = (graph: number[][]) => {
  const n = graph.length;
  const e = graph.reduce((sum, edges) => sum + edges.length, 0); // Number of edges in the graph

  const ins = Array(graph.length).fill(0);
  const outs = Array(graph.length).fill(0);

  const path: number[] = []; // To store the Eulerian path

  const countInsAndOuts = () => {
    graph.forEach((nodeAdjacencyList, i) => {
      nodeAdjacencyList.forEach(edge => {
        outs[i]++; // Increment out degree for the source node
        ins[edge]++; // Increment in degree for the destination node
      })
    })
  }

  const graphHasEulerianPath = () => {
    let startNodes = 0;
    let endNodes = 0;
    for (let i = 0; i < n; i++) {
      if ((outs[i] - ins[i]) > 1 || (ins[i] - outs[i]) > 1) {
        return false; // More than one node with unbalanced in/out degree
      } else if (outs[i] - ins[i] === 1) {
        startNodes++; // Node with one more out degree than in degree
      } else if (ins[i] - outs[i] === 1) {
        endNodes++; // Node with one more in degree than out degree
      }
    }
    return (startNodes === 1 && endNodes === 1) || (startNodes === 0 && endNodes === 0);
  }

  const findStartingNode = () => {
    // Assume 0 for start
    let startNode = 0;
    for (let i = 0; i < n; i++) {
      // If there's a node with more outs than ins, must be the start
      if (outs[i] - ins[i] === 1) return i;
      // If there are outs to this node, it can be a start
      if (outs[i] > 0) startNode = i;
    }
    return startNode;
  }

  const dfs = (at: number) => {
    // While current node has outgoing edges
    while (outs[at] > 0) {
      // Get next edge to visit
      const nextEdge = graph[at].at(--outs[at])!; // Decrement before accessing
      dfs(nextEdge); // Visit next edge
    }
    // Backtrack and add current node to path
    path.unshift(at);
  }

  // Main logic
  countInsAndOuts(); // Count in and out degrees for each node
  if (!graphHasEulerianPath()) {
    return []; // No Eulerian path exists
  }
  const startNode = findStartingNode(); // Find a suitable starting node
  dfs(startNode); // Perform DFS to find the Eulerian path

  // Check if the path length matches the number of edges
  if (path.length - 1 !== e) {
    return []; // If the path length does not match the number of edges, return empty
  }
  return path; // Return the Eulerian path
}

const result = eulerianPath(createGraphForEulerian());
console.assert(result.length === 13); 
