/**
 * An implementation of a Sparse Table for range minimum queries.
 * Sparse tables allow for efficient querying of pre-computed values.
 * This particular implementation is focused on finding the minimum value in a range.
 * @param {number[]} arr - The input array for which the sparse table is built.
 */
export const sparseTable = (arr: number[]) => {
  const n = arr.length;
  // Calculate the maximum power of 2 needed
  const P = Math.floor(Math.log2(n)); 
  // The actual sparse table to hold the minimum values.
  const table: number[][] = Array.from({ length: P + 1 }, () => Array(n).fill(null));
  // Used to query the index of the min element in a range, not the value itself.
  const indexTable: number[][] = Array.from({ length: P + 1 }, () => Array(n).fill(null));

  // Lookup table for the floor of log base 2.
  const log2 = Array(n + 1).fill(0);
  for (let i = 2; i <= n; i++) {
    log2[i] = log2[i >> 1] + 1; // i >> 1 is equivalent to Math.floor(i / 2)
  }

  // Fill the first row of the sparse table with the original array values.
  for (let i = 0; i < n; i++) {
    table[0][i] = arr[i];
    indexTable[0][i] = i; // Store the index of the element
  }

  // Build the sparse table
  for (let p = 1; p <= P; p++){
    for (let i = 0; i + (1 << p) <= n; i++){
      // Compare the two halves of the range
      const left = table[p - 1][i];
      const right = table[p - 1][i + (1 << (p - 1))];
      // Store the minimum value in the current range
      table[p][i] = Math.min(left, right);

      // Save the index of the minimum value
      if (left <= right) {
        indexTable[p][i] = indexTable[p - 1][i];
      } else {
        indexTable[p][i] = indexTable[p - 1][i + (1 << (p - 1))];
      }
    }
  }

  // Table is now built, here's the query functions

  // Returns the minimum value in the range [l, r]
  // l and r are inclusive indices.
  const minQuery = (l: number, r: number): number => {
    const len = r - l + 1;
    const p = log2[len]; 
    const left = table[p][l];
    const right = table[p][r - (1 << p) + 1];
    return Math.min(left, right);
  }

  // Cascading query that uses the precomputed powers of 2 to find the minimum
  // This is more efficient for larger ranges.
  const cascadingMinQuery = (l: number, r: number): number => {
    let min = Infinity;
    for (let p = log2[r - l +1]; l <= r; p = log2[r - l + 1]){
      min = Math.min(min, table[p][l]);
      l += (1 << p);
    }
    return min;
  }

  // Returns the index of the minimum value in the range [l, r]
  // l and r are inclusive indices.
  const minIndexQuery = (l: number, r: number): number => {
    const len = r - l + 1;
    const p = log2[len];
    const leftValue = table[p][l];
    const rightValue = table[p][r - (1 << p) + 1];
    return arr[leftValue] <= arr[rightValue] ? indexTable[p][l] : indexTable[p][r - (1 << p) + 1];
  }

  return {
    minQuery,
    cascadingMinQuery,
    minIndexQuery,
    table, // For debugging purposes
    indexTable // For debugging purposes
  }
}

const testArray = [5, 8, 7, 12, 9, 10, 15];
const sparse = sparseTable(testArray);
console.assert(sparse.minQuery(1, 5) === 7, "Min query failed");
console.assert(sparse.cascadingMinQuery(1, 5) === 7, "Cascading min query failed");
