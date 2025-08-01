import { WeightedEdge, createMinimumSpanningTreeGraph } from './graph.ts'

/**
 * Kruskal's Minimum Spanning Tree
 * Finds the path that connects all nodes in a graph with the lowest total cost of edges.
 * Creates a subgraph that contains no cycles.
 * Does this by grouping nodes effectively based on low-cost edges. These groups are combined until only a single group remains.
 */
const kruskalsMinimumSpanningTree = (graph: WeightedEdge[][]) => {
  // We'll start with the lowest-cost edges
  const sortedEdges = graph.flatMap(edges => edges).sort((a,b) => a.weight - b.weight)
  const nodeGroups = Array<number | null>(graph.length).fill(null); // To track the group each node is in.
  const includedEdges: WeightedEdge[] = []
  // Variables for when to stop the loop and to track current edge.
  const totalNodes = graph.length;
  let unifiedNodes = 0;
  let currentEdge = 0;
  let nextUnion = 1;
  // As long as there are still edges to check and not all nodes are unified.
  while (currentEdge < sortedEdges.length && unifiedNodes < totalNodes){
    const edge = sortedEdges.at(currentEdge)!;
    // If both nodes are already unified and in the same group
    if ((nodeGroups[edge.from] && nodeGroups[edge.to]) && (nodeGroups[edge.from] === nodeGroups[edge.to])){
      // Don't include this edge
      currentEdge++;
      continue;
    }

    // Include the edge and unify nodes
    includedEdges.push(edge);
    // If both are ununified, assign new union to both
    if (nodeGroups[edge.from] == null && nodeGroups[edge.to] == null){
      nodeGroups[edge.from] = nextUnion;
      nodeGroups[edge.to] = nextUnion;
      nextUnion++;
      unifiedNodes += 2;
    } else if (nodeGroups[edge.from] != null && nodeGroups[edge.to] != null) {
      // If they're both in unions, combine the two unions.
      // We know it's not the same union from the earlier check.
      const fromGroup = nodeGroups[edge.from];
      const toGroup = nodeGroups[edge.to];
      for (let i = 0; i < nodeGroups.length; i++) {
        if (nodeGroups[i] === toGroup) {
          nodeGroups[i] = fromGroup;
        }
      }
    } else {
      // One has a union but the other doesn't.
      // Ununified node gets absorbed.
      const unionNumber = nodeGroups[edge.from] ?? nodeGroups[edge.to];
      nodeGroups[edge.from] = unionNumber;
      nodeGroups[edge.to] = unionNumber;
      unifiedNodes += 1;
    }
    currentEdge++;
  }

  return {
    nodeGroups,
    includedEdges,
    totalCost: includedEdges.reduce((acc, curr) => acc + curr.weight, 0)
  }
}

const result = kruskalsMinimumSpanningTree(createMinimumSpanningTreeGraph())
console.assert(result.totalCost == 20)
// Every node should be in the same group
const firstGroup = result.nodeGroups.at(0)!;
console.assert(result.nodeGroups.every(group => group == firstGroup))
