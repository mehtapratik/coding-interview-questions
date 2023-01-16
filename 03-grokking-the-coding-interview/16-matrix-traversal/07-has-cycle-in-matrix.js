//
// INSTRUCTIONS
//
// You are given a 2D matrix containing different characters, you need to find
// if there exists any cycle consisting of the same character in the matrix.
//
// A cycle is a path in the matrix that starts and ends at the same cell and
// has four  or more cells.From a given cell, you can move to one of the cells
// adjacent to it - in one of the four directions(up, down, left, or right),
// if it has the same character value of the current cell.
//
// Write a function to find if the matrix has a cycle.
//

//
// EXAMPLE
//
// input
// ["a", "a", "a", "a"],
// ["b", "a", "c", "a"],
// ["b", "a", "c", "a"],
// ["b", "a", "a", "a"],
//
// output: true
//
// Explanation: Here's the visualization where you can see cycle clearly
//
// ["a", "a", "a", "a"],
// [     "b",      "a"],
// [     "a",      "a"],
// [     "a", "a", "a"],
//

//
// CODE
//
// O(r * c)TS
function hasCycleInMatrix(matrix) {
   if (Array.isArray(matrix) === false || Array.isArray(matrix[0]) === false) {
      return false;
   }

   const ROW_COUNT = matrix.length;
   const COL_COUNT = matrix.length;
   const matrixLog = {};
   for (let x = 0; x < ROW_COUNT; x++) {
      for (let y = 0; y < COL_COUNT; y++) {
         // don't visit the same cell if it was already been visited earlier
         // by a former bfs look-up.
         if (!matrixLog[coord(x, y)]) {
            // if (startsCycleFromHere_1(x, y)) {
            //    return true;
            // }
            if (startsCycleFromHere_2(x, y)) {
               return true;
            }
         }
      }
   }

   // if we're here that means, matrix does not have any cycle in it.
   return false;

   function startsCycleFromHere_1(originX, originY, seriesLog = {}) {
      const queue = [[originX, originY]];

      while (queue.length > 0) {
         const [x, y] = queue.shift();
         seriesLog[coord(x, y)] = true;
         matrixLog[coord(x, y)] = true;
         // we cannot use `matrixLog` to detect the cycle because it will have cell from previous
         // character series marked as visited. we only want to check which
         // cells from current character series that have been visited. e.g. if we're checking
         // for cell with 'a' in it, we don't want to check if cells with 'b' has been visited
         // or not.
         if (hasCycleHere(x, y, seriesLog)) {
            return true;
         }

         // queue the surrounding cells only if a) it has same value as current cell
         // and b) is not present in `seriesLog` i.e. not already been checked for cycle
         // in current bfs look-up.
         queueIfSameCell(x - 1, y, matrix[x][y], queue, seriesLog);
         queueIfSameCell(x + 1, y, matrix[x][y], queue, seriesLog);
         queueIfSameCell(x, y - 1, matrix[x][y], queue, seriesLog);
         queueIfSameCell(x, y + 1, matrix[x][y], queue, seriesLog);
      }

      // if we're here, it means we could not detect cycle in current character series
      return false;
   }

   function startsCycleFromHere_2(originX, originY) {
      const queue = [[originX, originY, -1, -1]];

      while (queue.length > 0) {
         const [x, y, formerX, formerY] = queue.shift();

         // we've found the cycle if we came across already visited cell
         if (coord(x, y) in matrixLog) {
            return true;
         }

         matrixLog[coord(x, y)] = true;

         // while queuing surrounding cells one of the cell may be the same
         // former cell that queued current cell. If so, we don't want to
         // queue same former cell again.
         queueCell(formerX, formerY, x, y, x - 1, y, queue);
         queueCell(formerX, formerY, x, y, x + 1, y, queue);
         queueCell(formerX, formerY, x, y, x, y - 1, queue);
         queueCell(formerX, formerY, x, y, x, y + 1, queue);
      }

      return false;
   }

   function queueCell(fx, fy, cx, cy, nx, ny, queue) {
      // cannot queue - next x, y range is out of matrix boundary
      if (nx < 0 || ny < 0 || nx >= ROW_COUNT || ny >= COL_COUNT) {
         return;
      }

      // cannot queue - next cell coordinates are same as former cell coordinates
      if (nx === fx && ny === fy) {
         return;
      }

      // qeuue only if next cell's value is same as current cell's value
      if (matrix[nx][ny] === matrix[cx][cy]) {
         queue.push([nx, ny, cx, cy]);
      }
   }

   function coord(x, y) {
      return `${x},${y}`;
   }

   function queueIfSameCell(x, y, expectedValue, queue, seriesLog) {
      if (x < 0 || y < 0 || x >= ROW_COUNT || y >= COL_COUNT) {
         return;
      }
      if (matrix[x][y] === expectedValue && !seriesLog[coord(x, y)]) {
         seriesLog[coord(x, y)] = true;
         queue.push([x, y]);
      }
   }

   function hasCycleHere(x, y, seriesLog) {
      let visitedCount = 0;

      visitedCount += seriesLog[coord(x - 1, y)] ? 1 : 0;
      visitedCount += seriesLog[coord(x + 1, y)] ? 1 : 0;
      visitedCount += seriesLog[coord(x, y - 1)] ? 1 : 0;
      visitedCount += seriesLog[coord(x, y + 1)] ? 1 : 0;

      // we know we have a cycle from current position when we have two or more visited cell
      // surrounding current cell. otherwise, it will be only one visited cell (former one)
      return visitedCount >= 2;
   }
}

//
// TEST
//
console.log(
   hasCycleInMatrix([
      ["a", "a", "a", "a"],
      ["b", "a", "c", "a"],
      ["b", "a", "c", "a"],
      ["b", "a", "a", "a"],
   ])
);

console.log(
   hasCycleInMatrix([
      ["a", "a", "a", "a"],
      ["a", "b", "b", "a"],
      ["a", "b", "a", "a"],
      ["a", "a", "a", "c"],
   ])
);

console.log(
   hasCycleInMatrix([
      ["a", "b", "e", "b"],
      ["b", "b", "b", "b"],
      ["b", "c", "c", "d"],
      ["c", "c", "d", "d"],
   ])
);
