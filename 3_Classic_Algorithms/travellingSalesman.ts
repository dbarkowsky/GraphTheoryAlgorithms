/**
 * Travelling Salesman Problem (TSP) using Dynamic Programming and Bitmasking.
 * The concept for this one is straighforward. We get the distance between all nodes.
 * For each node, we visit their neighbours and get the distance to the next node.
 * We do this recursively until we visit all nodes and have the minimum distance.
 * 
 * The complex part is the bitmasking. We use a bitmask to represent the visited nodes.
 * For example, if we have 4 nodes, we can represent the visited nodes as a binary number. 
 * 1010 means that the second and fourth nodes are visited. We count from the right to left.
 * 
 * I have a hard time wrapping my head around this, but it seems to work.
*/
import { createGraphForTravellingSalesman } from "./graphs.ts";

export const travellingSalesman = (graph: {
  nodeId: number;
  weight: number;
}[][], startingId: number = 0
) => {
  // This is the setup for the algorithm.
  // 
  const n = graph.length;
  const path: number[] = [];
  let minDistance = Infinity; // Minimum distance.
  let ranSolver = false; // Flag to check if the solver has run.
  // 1 << n is 2^n, which represents all possible subsets of nodes.
  const ALL_NODES = (1 << n);
  const END_STATE = ALL_NODES - 1; // All nodes visited when the state equals this.
  // Cache for memoization.
  const cache = Array.from({ length: n }, () => Array(ALL_NODES)); 

  if (n <= 2) throw new Error("Graph must have more than 2 nodes.");
  if (startingId < 0 || startingId >= n) throw new Error("Invalid starting node.");

  const getPath = () => {
    if (!ranSolver) solve();
    return path;
  }

  const getDistance = () => {
    if (!ranSolver) solve();
    return minDistance;
  }

  /**
   * @description Get all combinations of n elements from a set of ones. We want this to represent all possible subsets of nodes.
   * For example, if want to get all combinations of 2 nodes, we will get: 00, 01, 10, 11
   * @param ones 
   * @param n 
   * @returns 
   */
  const getCombinations = (ones: number, n: number) => {
    const subsets: number[] = [];
    /**
     * 
     * @param set 
     * @param at 
     * @param r // The number of ones we want in the set. aka the number of nodes we want to visit.
     * @param n // The total number of nodes.
     * @param subsets 
     * @returns 
     */
    const makeCombos = (set: number, at: number, r: number, n: number, subsets: number[]) => {
      const elementsLeftToPick = n - at;
      if (elementsLeftToPick < r) return; // Not enough elements left to pick.

      if (r === 0) {
        subsets.push(set);
      } else {
        for (let i = at; i < n; i++) {
          // This 1 << i is used for binary representation of the set.
          // For example, if i = 2, then 1 << i = 4, which is 0100 in binary.
          set |= (1 << i); // Add the current element to the set.  |= is bitwise OR= assignment operator, like +=
          makeCombos(set, i + 1, r - 1, n, subsets); // Recur for the next element.

          // Backtrack: remove the current element from the set.
          set &= ~(1 << i); // Remove the current element from the set.
        }
      }
    }
    makeCombos(0, 0, ones, n, subsets); // Start with an empty set and at the first element.
    return subsets
  }

  const notIn = (set: number, subset: number) => {
    // Check if the starting node is not in the subset.
    // This is done by checking if the bit at the index of the set is 0.
    // For example, if set = 2 (010) and subset = 3 (011), then notIn(2, 3) will return true.
    // 010 is not in 011, so we can visit the node.
    return (subset & (1 << set)) === 0;
  }

  const solve = () => {
    if (ranSolver) return; // If already solved, return.

    // Add outgoing edges from the starting node to the cache.
    for (let end = 0; end < n; end++) {
      if (end !== startingId) {
        cache[end][1 << startingId | (1 << end)] = graph[startingId][end].weight;
      }
    }

    // Why 3? Because we need at least 3 nodes to form a path, and we already have the starting node.
    for (let ones = 3; ones <= n; ones++) {
      // For each combination of nodes, we need to find the minimum distance.
      for (const subset of getCombinations(ones, n)) {
        if (notIn(startingId, subset)) continue; // Skip if starting node is not in the subset.
        // From starting node to next node, finding the minimum distance.
        for (let next = 0; next < n; next++) {
          if (next === startingId || notIn(next, subset)) continue; // Skip if next node is the starting node.
          const subsetWithoutNext = subset ^ (1 << next); // Remove the next node from the subset. ^ is bitwise XOR operator.
          let minDistance = Infinity; // Initialize minimum distance.
          // Getting distance from the next node to all other nodes.
          for (let end = 0; end < n; end++) {
            if (end === startingId || end === next || notIn(end, subset)) continue; // Skip if end node is the starting node or next node.
            const distanceToEnd = cache[end][subsetWithoutNext] + graph[end][next].weight; // Calculate distance to end node.
            if (distanceToEnd < minDistance) {
              minDistance = distanceToEnd; // Update minimum distance.
            }
          }
          cache[next][subset] = minDistance; // Store minimum distance in cache.
        }
      }
    }

    // Calculate the minimum distance for the last node.
    for (let end = 0; end < n; end++) {
      if (end === startingId) continue; // Skip if end node is the starting node.
      const distanceToEnd = cache[end][END_STATE] + graph[end][startingId].weight; // Calculate distance to end node.
      if (distanceToEnd < minDistance) {
        minDistance = distanceToEnd; // Update minimum distance.
      }
    }


    let lastIndex = startingId;
    let lastState = END_STATE;
    path.push(startingId) // Add starting node to the start of the path.

    // Use cache to find the path.
    for (let i = 0; i < n - 1; i++) {
      let index = -1; // Initialize index.
      for (let j = 0; j < n; j++) {
        if (j === startingId || notIn(j, lastState)) continue; // Skip if j is the starting node or not in the last state.
        if (index === -1) index = j; // Set index to j if not set.
        const prevDistance = cache[index][lastState] + graph[index][lastIndex].weight; // Calculate previous distance.
        const nextDistance = cache[j][lastState] + graph[j][lastIndex].weight; // Calculate next distance.
        if (prevDistance > nextDistance) { // If previous distance is greater than next distance, update index.
          index = j;
        }
      }
      path.push(index)
      lastState = lastState ^ (1 << index); // Remove index from last state.
      lastIndex = index; // Update last index.
    }

    path.push(startingId) // Add starting node to the end of the path.
    ranSolver = true; // Set flag to true.
  }

  return {
    getDistance,
    getPath
  }
}

const graph = createGraphForTravellingSalesman();
console.log(graph); 
const { getDistance, getPath } = travellingSalesman(graph, 0);
console.log(getDistance()); 
console.log(getPath()); 

