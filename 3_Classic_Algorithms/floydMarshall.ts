/**
 * Floyd-Marshall gets all of the possible costs for every pair nodes in a graph.
 * It works with negative cost edges and detects negative feedback cycles.
 * The result is a matrix of costs where matrix[a][b] would give the cost to get from a to b.
 * Ideal for small graphs only. O(V^3) complexity.
 */

const floydMarshall = (matrix: number[][]) => {
  // Setup portion.
  const costTracker = Array.from(matrix);
  // Start by creating empty matrix to track path
  const pathTracker: number[][] = [];
  for (let i = 0; i < matrix.length; i++){
    const row: number[] = []
    for (let j = 0; j < matrix.length; j++){
      row.push(Infinity)
    }
    pathTracker.push(row);
  }
  // If there's no known cost from i to j, then set the next edge to calculate to the j index.
  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix.length; j++){
      if (matrix[i][j] != Infinity){
        pathTracker[i][j] = j;
      }
    }
  }

  // Get all pairs shortest paths
  for (let k = 0; k < matrix.length; k++){
    for (let i = 0; i < matrix.length; i++){
      for (let j = 0; j < matrix.length; j++){
        if (costTracker[i][k] + costTracker[k][j] < costTracker[i][j]){
          // Going to this additional node is shorter than going directly. Update cost.
          costTracker[i][j] = costTracker[i][k] + costTracker[k][j];
          // And mark that new, shortest path.
          pathTracker[i][j] = pathTracker[i][k];
        }
      }
    }
  }

  // Detect the negative cycles
  // Similar to Bellman-Ford. If it can be lowered yet again, it must be in a negative cycle or affected by one.
  for (let k = 0; k < matrix.length; k++){
    for (let i = 0; i < matrix.length; i++){
      for (let j = 0; j < matrix.length; j++){
        if (costTracker[i][k] + costTracker[k][j] < costTracker[i][j]){
          costTracker[i][j] = -Infinity;
          pathTracker[i][j] = -1;
        }
      }
    }
  }

  // Can run this after doing the initial detection of cycles and costs.
  // Gets a list of each node needed to traverse to get the shortest path.
  const reconstructPath = (start: number, end: number) => {
    const path: number[] = [];
  
    // If it's still Infinity, there was no path without negative cycles.
    if (costTracker[start][end] == Infinity) return path;
  
    // Progress along the path, adding 
    let at = start;
    while (at != end){
      if (at == -1) return null;
      path.push(at);
      at = pathTracker[at][end];
    }
  
    // Just to get last node. It's still -1 because it has nowhere to go to
    if (pathTracker[at][end] == -1) return null;
    path.push(end);
  
    return path;
  }

  return {costTracker, reconstructPath};
}

// This is an adjacency matrix. Represents createWeightedAdjacencyListWithNegatives function in trees.ts
// A number represents a directional edge between two nodes. Infinity means no direct edge connection.
const matrix = [
  [Infinity, 5, Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,],
  [Infinity,Infinity,20, Infinity,Infinity,30, 60,Infinity,Infinity,Infinity,],
  [Infinity,Infinity,Infinity,10, 75, Infinity,Infinity,Infinity,Infinity,Infinity,],
  [Infinity,Infinity,-15,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,],
  [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,100],
  [Infinity,Infinity,Infinity,Infinity,24, Infinity,5,Infinity,50,Infinity,],
  [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,-50,Infinity,Infinity,],
  [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,-10, Infinity,],
  [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,],
  [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,]
]

const {costTracker, reconstructPath} = floydMarshall(matrix);
console.log(`Cost from 0 to 8: ${costTracker[0][8]}`)
const pathResult = reconstructPath(0, 8)
console.log(pathResult);
