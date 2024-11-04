/**
 * Based on example from video lesson. 
 * Not incredibly fond of this method. See simpleBfsQueue.ts for an easier method.
 * Finds the length of a shortest path, but not the path itself.
 */

const grid = [
  ['S', '.', '.', '.', '#'],
  ['.', '#', '#', '.', '.'],
  ['.', '.', '.', '#', '#'],
  ['#', '.', '.', '#', 'E'],
  ['.', '.', '.', '.', '.'],
  ['.', '#', '.', '.', '#']
]

const start = [0, 0];

const bfsFindShortestPath = (grid: string[][], start: number[]) => {
  let atEnd = false;
  // Doing this weird array creation because it was creating reference types otherwise.
  const visited = Array(grid.length).fill(0).map(() => Array(grid[0].length).fill(false));
  const goal = 'E';
  // Track number of steps
  let moveCounter = 0;
  let nodesRemainingInLayer = 1;
  let nodesInNextLayer = 0;

  // Dimension vectors
  const possibleDirections = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  // Make queue and add start
  const queue = [start];
  // Mark visited
  visited[start.at(0)!][start.at(1)!] = true;

  while (queue.length) {
    const current = queue.shift();
    // Endpoint found
    if (grid[current?.at(0)!][current?.at(1)!] == goal) {
      atEnd = true;
      break;
    }
    
    // Add neighbouring nodes
    possibleDirections.forEach(direction => {
      const newX = current?.at(0)! + direction.at(0)!;
      const newY = current?.at(1)! + direction.at(1)!;

      // If valid point and not visited, add to queue
      if (!(newX < 0 || newY < 0 || newX >= grid.length || newY >= grid.at(0)!.length)){
        if (!(visited[newX][newY] || grid[newX][newY] === '#')){
          queue.push([newX, newY]);
          visited[newX][newY] = true;
          nodesInNextLayer++;
        }
      } 
    })

    // Counting the layers here. Seems like there should be a simpler way to do this.
    nodesRemainingInLayer--;
    if (nodesRemainingInLayer === 0){
      nodesRemainingInLayer = nodesInNextLayer;
      nodesInNextLayer = 0;
      moveCounter++;
    }
  }

  if (atEnd) {
    return moveCounter;
  }
  return -1;
}

const result = bfsFindShortestPath(grid, start);
console.assert(result === 9)
