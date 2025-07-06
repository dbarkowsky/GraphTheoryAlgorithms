import { FlowEdge, buildFlowGraph } from "./flowGraph.ts";

/**
 * Dinic's Max Flow Algorithm
 * This algorithm uses BFS to build a level graph and then uses DFS to find augmenting paths
 * This is effective because it avoids the pitfalls of low capacity edges by always trying to move up a level in the level graph.
 * BFS to establish levels, DFS to find augmenting paths, repeat until no more augmenting paths can be found.
 * @param graph Adjacency list representing the flow network, where each edge has a capacity.
 * @param source Starting node of the flow (source).
 * @param sink Ending node of the flow (sink).
 * @returns Max flow from source to sink.
 */
const dinics = (graph: FlowEdge[][], source: number, sink: number): number => {
  let maxFlow = 0;
  const n = graph.length;

  const level = new Array(n); // To keep track of levels in BFS
  // This next array helps to prune dead ends in DFS.
  // next[i] will point to the next edge to explore from node i in DFS.
  // If its value is 0, it means it's free to explore again.
  const next = new Array(n); 

  // BFS to build level graph
  // Also detect if there is a path from source to sink.
  const bfs = (): boolean => {
    level.fill(-1); // Reset levels each time we run BFS
    const queue = Array<number>();
    queue.push(source);
    level[source] = 0; // Level of source is 0

    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const edge of graph[current]) {
        const capacity = edge.remainingCapacity();
        if (capacity > 0 && level[edge.to] === -1) { // If edge has capacity and the level isn't established
          level[edge.to] = level[current] + 1; // Set level of to node
          queue.push(edge.to); // Add to queue for further exploration
          // Don't exit early, we want to explore all reachable nodes to establish levels.
        }
      }
    }
    // Did we reach the sink?
    return level[sink] !== -1; // If sink has a level, we have a path
  }

  const dfs = (node: number, next: number[], flow: number): number => {
    if (node ===  sink) return flow; // Reached sink, return the flow
    // Note number of edges from this node.
    const numberOfEdges = graph[node].length;
    // As long as there are edges to explore from this node
    while (next[node] < numberOfEdges){
      // Get the next edge. next[node] is the index of the next edge to explore from node.
      const edge = graph[node][next[node]];
      const capacity = edge.remainingCapacity();
      // Only consider edges with remaining capacity AND
      // Always try to move up a level in the level graph. 
      // This keeps us moving towards the sink, which should be the most efficient path.
      if (capacity > 0 && level[edge.to] === level[node] + 1){
        const bottleNeck = dfs(edge.to, next, Math.min(flow, capacity)); // Keep previously found bottleneck or this smaller capacity (new bottleneck)
        if (bottleNeck > 0) {
          edge.augmentFlow(bottleNeck); // Augment flow along the edge
          return bottleNeck; // Return the flow found
        }
      }
      next[node]++; // Increment next edge to explore
    }
    // If we reach here, no more augmenting paths from this node.
    return 0;
   }

  while (bfs()) {
    // Reset next array
    next.fill(0);
    // Find max flow by adding all augmenting path flows
    for (let flow = dfs(source, next, Infinity); flow !== 0; flow = dfs(source, next, Infinity)) {
      maxFlow += flow;
    }
  }
  return maxFlow;
}


const { graph, sourceIndex, sinkIndex } = buildFlowGraph();
const maxFlow = dinics(graph, sourceIndex, sinkIndex);
console.assert(maxFlow === 23); // Should output 23
