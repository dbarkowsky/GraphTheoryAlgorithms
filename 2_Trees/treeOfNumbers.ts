/**
 * Just a simple tree containing a set of unique numbers.
 * No refernces to parent.
 */
export const treeOfNumbers = {
  5: [4, 3],
  4: [1, 6],
  1: [2, 9],
  2: [],
  9: [],
  3: [7, 10],
  7: [8],
  6: [],
  10: [], 
  8: [],
}

/**
 * Just a simple tree containing a set of unique numbers.
 */
export const treeOfNumbersWithParents = {
  5: [4, 3],
  4: [1, 6, 5],
  1: [2, 9, 4],
  2: [1],
  9: [1],
  3: [7, 10, 5],
  7: [8, 3],
  6: [4],
  10: [3], 
  8: [7],
}
