
import { buildFlowGraph, FlowEdge } from "./flowGraph.ts";
/**
 * Finds the maximum flow in a flow network using the Ford-Fulkerson method with DFS.
 * @param graph Adjacency list representing the flow network, where each edge has a capacity.
 * @param source Where the flow starts 
 * @param sink Where the flow ends
 * @returns A number representing the maximum flow from source to sink.
 */
const fordFulkerson = (graph: FlowEdge[][], source: number, sink: number) => {
  let maxFlow = 0;
  const n = graph.length;

  let visited_token = 1;
  const visited_nodes = new Array(n).fill(0);

  const dfs = (node: number, flow: number): number => {
    if (node === sink) {
      return flow; // Reached sink, return the flow
    }

    visited_nodes[node] = visited_token; // Mark node as visited

    for (const edge of graph[node]) {
      if (edge.remainingCapacity() > 0 && visited_nodes[edge.to] !== visited_token) {
        // If edge has remaining capacity and the destination node is not visited in this iteration
        const bottleNeck = Math.min(flow, edge.remainingCapacity()); // Keep previously found bottleneck or this smaller capacity (new bottlenect)
        const resultFlow = dfs(edge.to, bottleNeck); // Continue DFS to find the sink

        // This implies we made it from source to sink.
        if (resultFlow > 0) {
          edge.augmentFlow(resultFlow); // Augment flow along the edge
          return resultFlow; // Return the flow found
        }
      }
    }

    return 0; // No flow found in this path. Did not reach sink.
  }

  // Solve network flow problem:
  // While there is a path from source to sink, augment flow along that path.
  // Only stop when there are no more augmenting paths. aka no new flow found.
  for (let flow = dfs(source, Infinity); flow !== 0; flow = dfs(source, Infinity)) {
    visited_token++;
    maxFlow += flow;
  }

  return maxFlow;
}

// Example usage
const { graph, sourceIndex, sinkIndex } = buildFlowGraph();
const maxFlow = fordFulkerson(graph, sourceIndex, sinkIndex);
console.assert(maxFlow === 23); // Should output 23
