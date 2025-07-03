import { buildFlowGraph, FlowEdge } from "./flowGraph.ts";

/**
 * Another max-flow algorithm that uses BFS to find augmenting paths, similar to Ford-Fulkerson but not dependant on capacity of edges.
 * @param graph Adjacency list representing the flow network, where each edge has a capacity.
 * @param source Index of the source node
 * @param sink Index of the sink node
 * @returns Integer representing the maximum flow from source to sink.
 */
const edmondsKarp = (graph: FlowEdge[][], source: number, sink: number) => {
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

  const bfs = () => {
    const queue: number[] = []; 
    visit(source); // Mark source as visited
    queue.push(source); // Start BFS from source

    // To store the path found, we will track the previous edges leading to each node.
    // This will help us reconstruct the path from source to sink.
    const previous: FlowEdge[] = Array(graph.length); 
    while (queue.length > 0) {
      const current = queue.shift()!; // Can be non-null, as we check length above
      if (current === sink){
        break; // Found a path to sink
      }
      for (const edge of graph[current]) {
        const remainingCapacity = edge.remainingCapacity();
        if (remainingCapacity > 0 && !isVisited(edge.to)) {
          visit(edge.to); // Mark the node as visited
          queue.push(edge.to); // Add to queue for further exploration
          previous[edge.to] = edge; // Track the edge leading to this node
        }
      }
    }

    if (previous[sink] == null) {
      return 0; // No path found to sink
    }

    // At this point, we have a path to the sink.
    // Need to identify the bottleneck capacity and augment the flow along the path.
    let bottleneck = Infinity;
    for (let edge = previous[sink]; edge != null; edge = previous[edge.from]) {
      bottleneck = Math.min(bottleneck, edge.remainingCapacity());
    }
    for (let edge = previous[sink]; edge != null; edge = previous[edge.from]) {
      edge.augmentFlow(bottleneck); // Augment flow along the path
    }
    return bottleneck;
  }

  let flow = 0;
  do{
    // Each iteration can visit the same nodes if they have capacity.
    markAllUnvisited();
    // Finding the bottleneck flow using BFS.
    flow = bfs();
    maxFlow += flow;
  } while (flow !== 0); // 0 means no more augmenting paths found.
  return maxFlow;
}

const graph = buildFlowGraph();
const sourceIndex = graph.sourceIndex;
const sinkIndex = graph.sinkIndex;
const maxFlow = edmondsKarp(graph.graph, sourceIndex, sinkIndex);
console.assert(maxFlow === 23); // Should output 23
