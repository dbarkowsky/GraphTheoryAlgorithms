import { WeightedEdge, createMinimumSpanningTreeGraph } from './graph.ts'

/**
 * An algorithm that finds a minimum spanning tree subgraph in a larger graph.
 * It expects that there are no nodes completely separated from the graph.
 * This would be better with an adjacency matrix, but we use adjacency list.
 */
const primsMinimumSpanningTreeLazy = (graph: WeightedEdge[][], startingIndex = 0) => {
  // Priority queue because we need to always take the lowest weight path
  const priorityQueue: WeightedEdge[] = [];
  // We won't be visiting any node twice.
  const visited = Array(graph.length).fill(false);
  let edgeCount = 0;
  let mstCost = 0;
  const mstEdges = Array(graph.length - 1); // One less edge than nodes, which tells it's fully connected.

  // Inefficient mock priority queue.
  const addToPriorityQueue = (edge: WeightedEdge) => {
    priorityQueue.push(edge);
    priorityQueue.sort((a, b) => a.weight - b.weight);
  }

  // Adds all edges to queue from a node that don't point back to an already visited node.
  const addEdges = (nodeIndex: number) => {
    visited[nodeIndex] = true;

    const edges = graph[nodeIndex];
    edges.forEach(edge => {
      if (!visited[edge.to]) {
        addToPriorityQueue(edge);
      }
    })
  }

  addEdges(startingIndex);

  // Go until queue is empty or we meet the required number of edges.
  while (priorityQueue.length && edgeCount != mstEdges.length) {
    const edge = priorityQueue.shift()!;
    const nodeIndex = edge.to;

    // Don't do visited nodes again.
    if (visited[nodeIndex]) {
      continue;
    }

    // Just tracking progress.
    mstEdges[edgeCount] = edge;
    edgeCount++;
    mstCost += edge.weight;

    addEdges(nodeIndex);
  }

  // We didn't meet the required number of edges. This means there's no subgraph to get to all nodes.
  if (edgeCount != mstEdges.length) {
    return {
      mstCost: null,
      mstEdges: null
    };
  }

  return {
    mstCost,
    mstEdges
  }
}


const result = primsMinimumSpanningTreeLazy(createMinimumSpanningTreeGraph());
console.assert(result.mstCost === 20);
