/**
 * Tarjan's Algorithm for finding strongly connected components in a directed graph.
 * This algorithm uses depth-first search (DFS) to find all strongly connected components (SCCs) in a directed graph.
 * A strongly connected component is a maximal subgraph where every vertex is reachable from every other vertex in the subgraph.
 */

import { createGraphForTarjans } from "./graphs.ts"

const tarjanStronglyConnectedComponents = (graph: number[][]) => {
  const visited = Array(graph.length).fill(false); // Track visited nodes
  const lowLink = Array(graph.length).fill(0); // Low-link values
  const stack: number[] = []; // Stack to hold node ids during DFS
  const components: number[][] = []; // To store the strongly connected components

  const dfs = (at: number) => {
    visited[at] = true; // Mark the node as visited
    lowLink[at] = at; // Initialize low-link value to the node's index
    stack.push(at);  // Push the node onto the stack

    // Explore all neighbors of the current node
    for (const to of graph[at]) {
      // Only explore neighbour if it hasn't been visited yet
      if (!visited[to]) {
        dfs(to);
      }
      // If the neighbor is in the stack, update the current node's low-link value 
      if (stack.includes(to)) {
        lowLink[at] = Math.min(lowLink[at], lowLink[to]);
      }
    }

    // Now that all the neighbours have been explored
    // If this node's id is the same as its low-link value, it means it's a root node of a stongly connected component
    if (lowLink[at] === at) {
      const component: number[] = [];
      let node;
      // Pop nodes from the stack until we reach the current node
      // This will give us all the nodes in the strongly connected component
      do {
        node = stack.pop();
        component.push(node!); // No situation where node is undefined, so we can use non-null assertion operator
      } while (node !== at);
      components.push(component); // Add the component to the list of strongly connected components
    }
  }

  for (let i = 0; i < graph.length; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }
  return components; 
}

const result = tarjanStronglyConnectedComponents(createGraphForTarjans())
console.assert(result.length === 3, "There should be 3 strongly connected components")
console.assert(result[0].length === 3, "The first component should have 3 nodes")
console.assert(result[1].length === 3, "The second component should have 3 nodes")
console.assert(result[2].length === 2, "The third component should have 2 nodes")
console.assert(result[0].includes(0), "The first component should include node 0")
