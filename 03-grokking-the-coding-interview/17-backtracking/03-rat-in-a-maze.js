//
// INSTRUCTIONS
//
// A Maze is given as N*N binary matrix of blocks where source block is the upper left
// most block i.e., maze[0][0] and destination block is lower rightmost block i.e.,
// maze[N - 1][N - 1].A rat starts from source and has to reach the destination.
// The rat can move only in two directions: forward and down.
//
// In the maze matrix, 0 means the cell is a blocked end and 1 means the cell can
// be used in the path from source to destination.
//

//
// EXAMPLE
//
// input:
//          [1, 0, 0, 0]
//          [1, 1, 0, 1]
//          [0, 1, 0, 0]
//          [1, 1, 1, 1]
// output:
//          [1, 0, 0, 0]
//          [1, 1, 0, 0]
//          [0, 1, 0, 0]
//          [0, 1, 1, 1]
//

//
// CODE
//
function ratInAMaze(maze) {
   const result = Array(maze.length)
      .fill(0)
      .map(() => Array(maze.length).fill(0));
   let i = 0;
   const cache = {};
   backtrack(0, 0);
   return result;

   // O(n)T - where n is number of cells in matrix. Even though we're running 4x recursion call calculation output
   //         will be memoized in `cache` object to avoid computing same r,c combinations again resulting into
   //         each r,c combination calculated once and only once.
   // O(n)S - for recursion call stack and cache object (2n).
   function backtrack(row, col) {
      // base case: we reached destination (the bottom/right cell)
      if (
         row === maze.length - 1 &&
         col === maze.length - 1 &&
         maze[row][col] === 1
      ) {
         result[row][col] = 1;
         return true;
      }
      // we at either at cell that's blocked or already been travelled earlier
      if (canMove(row, col) === false || result[row][col] === 1) {
         return false;
      }

      //check if solution is already been calculated for same row, cell earlier
      const key = `${row},${col}`;
      if (key in cache) {
         return cache[key];
      }

      cache[key] = (() => {
         // mark cell as travelled
         result[row][col] = 1;

         if (backtrack(row + 1, col)) {
            return true;
         } else if (backtrack(row, col + 1)) {
            return true;
         } else if (backtrack(row - 1, col)) {
            return true;
         } else if (backtrack(row, col - 1)) {
            return true;
         }

         result[row][col] = 0;
         return false;
      })();

      return cache[key];
   }

   function canMove(x, y) {
      if (x < 0 || y < 0 || x >= maze.length || y >= maze.length) {
         return false;
      }
      return maze[x][y] === 1;
   }
}

//
// TEST
//
showMatrix(
   ratInAMaze([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
   ])
);
