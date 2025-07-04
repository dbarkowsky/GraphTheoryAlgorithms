import { buildFlowGraph, FlowEdge } from "./flowGraph.ts";

/**
 * A different approach to the Ford-Fulkerson algorithm that uses capacity scaling to avoid low capacity edge pitfalls.
 * Using the delta value, it prioritizes finding paths with larger capacities first, which can lead to faster convergence.
 * @param graph Adjacency list representing the flow network, where each edge has a capacity.
 * @param source Starting node of the flow (source).
 * @param sink Ending node of the flow (sink).
 * @returns Max flow from source to sink.
 */
const capacityScaling = (graph: FlowEdge[][], source: number, sink: number) => {
  let maxFlow = 0;
  const n = graph.length;

  let visited_token = 1;
  const visited_nodes = new Array(n).fill(0);

  const visit = (node: number) => {
    visited_nodes[node] = visited_token; // Mark node as visited
  }  

  const isVisited = (node: number): boolean => {
    return visited_nodes[node] === visited_token; // Check if node is visited in this iteration
  }

  // By just increasing the definition of visited, we can mark all nodes as unvisited.
  const markAllUnvisited = () => {
    visited_token++;
  }

  // Mostly normal DFS.
  const dfs = (node:number, flow: number, delta: number): number => {
    if (node === sink) {
      return flow; // Reached sink, return the flow
    }
    visit(node); // Mark node as visited

    for (const edge of graph[node]) {
      const cap = edge.remainingCapacity();
      // Change happens here.
      // We only consider edges with capacity greater than or equal to delta for now.
      // As the delta decreases, we will consider smaller capacities in later iterations.
      if (cap >= delta && !isVisited(edge.to)) {
        const bottleNeck = dfs(edge.to, Math.min(flow, cap), delta); // Keep previously found bottleneck or this smaller capacity (new bottleneck)
        if (bottleNeck > 0) {
          edge.augmentFlow(bottleNeck); // Augment flow along the edge
          return bottleNeck; // Return the flow found
        }
      }
    }

    return 0; // No flow found in this path. Did not reach sink.
  }

  let maxCapacity = 0; // The maximum capacity of any edge in the graph.
  // Could be established while building the graph, but we do it here for clarity.
  for (const edges of graph) {
    for (const edge of edges) {
      if (edge.capacity > maxCapacity) {
        maxCapacity = edge.capacity;
      }
    }
  }
  // The largest power of 2 that is less than or equal to the maximum capacity in the graph. 
  let delta = Math.pow(2, Math.floor(Math.log2(maxCapacity))); 

  // Use this delta value to affect how we find augmenting paths.
  for (let flow = 0; delta > 0; delta /= 2) {
    do {
      markAllUnvisited();
      flow = dfs(source, Infinity, delta);
      maxFlow += flow;
    } while (flow !== 0); // 0 means no more augmenting paths found.
  }
  return maxFlow;
}

const graph = buildFlowGraph();
const result = capacityScaling(graph.graph, graph.sourceIndex, graph.sinkIndex);
console.assert(result === 23); // Should output 23
