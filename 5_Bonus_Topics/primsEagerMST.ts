import { WeightedEdge, createMinimumSpanningTreeGraph } from './graph.ts'
import { IndexedPriorityQueue } from "./IndexedPriorityQueue.ts";


/**
 * Prim's Eager Minimum Spanning Tree
 * An algorithm that finds a minimum spanning tree subgraph in a larger graph.
 * It expects that there are no nodes completely separated from the graph.
 * This would be better with an adjacency matrix, but we use adjacency list.
 */
const primsMinimumSpanningTreeEager = (graph: WeightedEdge[][], startingIndex = 0) => {
  // Priority queue because we need to always take the lowest weight path
  const priorityQueue: IndexedPriorityQueue = new IndexedPriorityQueue();
  // We won't be visiting any node twice.
  const visited = Array(graph.length).fill(false);
  let edgeCount = 0;
  let mstCost = 0;
  const mstEdges = Array(graph.length - 1); // One less edge than nodes, which tells it's fully connected.

  // Inefficient mock priority queue.
  const addToPriorityQueue = (edge: WeightedEdge) => {
    priorityQueue.enqueue(edge);
  }

  // Adds all edges to queue from a node that don't point back to an already visited node.
  const relaxEdgesAt = (nodeIndex: number) => {
    visited[nodeIndex] = true;

    // Get all edges going out from current node
    const edges = graph[nodeIndex];
    for (let i = 0; i < edges.length; i++) {
      const destinationNode = edges[i].to;
      if (visited[destinationNode]) continue;

      if (!priorityQueue.contains(destinationNode)) {
        // Insert edge for the first time.
        priorityQueue.enqueue(edges[i]);
      } else {
        // Improve the cheapest edge for destination node
        priorityQueue.decreaseKey(destinationNode, edges[i]);
      }
    }
    edges.forEach(edge => {
      if (!visited[edge.to]) {
        addToPriorityQueue(edge);
      }
    })
  }

  relaxEdgesAt(startingIndex);

  // Go until queue is empty or we meet the required number of edges.
  while (priorityQueue.size() && edgeCount != mstEdges.length) {
    const edge = priorityQueue.dequeue()!;
    const nodeIndex = edge.to;

    // Don't do visited nodes again.
    if (visited[nodeIndex]) {
      continue;
    }

    // Just tracking progress.
    mstEdges[edgeCount] = edge;
    edgeCount++;
    mstCost += edge.weight;

    relaxEdgesAt(nodeIndex);
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


const result = primsMinimumSpanningTreeEager(createMinimumSpanningTreeGraph(true));
console.assert(result.mstCost === 20);
