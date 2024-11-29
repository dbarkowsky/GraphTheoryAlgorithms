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
