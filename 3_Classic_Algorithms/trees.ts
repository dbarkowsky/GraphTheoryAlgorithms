export interface DagEdge {
  to: number;
  weight?: number;
}

// Adjacency list for a DAG
export const createAdjacencyList = (): DagEdge[][] => [
  [{to:3}], // A,0
  [{to:3}], // B,1
  [{to:0},{to:1}], // C,2
  [{to:6},{to:7}], // D,3
  [{to:0},{to:3},{to:5}], // E,4
  [{to:9},{to:10}], // F,5
  [{to:8}], // G,6
  [{to:8},{to:9}], // H,7
  [{to:11}], // I,8
  [{to:11},{to:12}], // J,9
  [{to:9}], // K,10
  [], // L,11
  [], // M,12
]

// Same idea but with weights
export const createWeightedAdjacencyList = (): DagEdge[][] => [
  [{to: 1, weight: 3},  {to: 2, weight: 6}], // A,0
  [{to: 2, weight: 4}, {to: 3, weight: 4}, {to: 4, weight: 11}], // B,1
  [{to: 3, weight: 8}, {to: 6, weight: 11}], // C,2
  [{to: 4, weight: 4}, {to: 5, weight: 5}, {to: 6, weight: 2}], // D,3
  [{to: 7, weight: 9}], // E,4
  [{to: 7, weight: 1}], // F,5
  [{to: 7, weight: 2}], // G,6
  [], // H,7
]

// Same idea but with negative weights
// Not really a tree, but still a graph.
// There are two nodes here in a negative cycle (2,3), but two more affected by it (4,9)
export const createWeightedAdjacencyListWithNegatives = (): DagEdge[][] => [
  [{to: 1, weight: 5}], // 0
  [{to: 2, weight: 20}, {to: 5, weight: 30}, {to: 6, weight: 60}], // 1
  [{to: 3, weight: 10}, {to: 4, weight: 75}], // 2
  [{to: 2, weight: -15},], // 3
  [{to: 9, weight: 100},], // 4
  [{to: 4, weight: 25}, {to: 6, weight: 5}, {to: 8,weight: 50}], // 5
  [{to: 7, weight: -50},], // 6
  [{to: 8, weight: -10}], // 7
  [], // 8
  [], // 9
]
