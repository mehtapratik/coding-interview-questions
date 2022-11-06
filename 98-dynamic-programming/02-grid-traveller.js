/*
There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). 
The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move 
either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take 
to reach the bottom-right corner.
*/

/*
Without Memoization: O(2^(r+c))T and O(r+c)S
With Memoization:O(r*c)TS
*/
function gridTraveller(r, c, cache = {}) {
   // if 2x3 matrix has 3 possible path then 3x2 matrix will also
   // have 3 possible paths, therefore, cache key of row_col can be
   // laveraged for col_row as well.
   const row_col = `${r},${c}`;
   const col_row = `${c},${r}`;
   if (row_col in cache) {
      return cache[row_col];
   }
   if (col_row in cache) {
      return cache[col_row];
   }

   if (r === 0 || c === 0) {
      return 0;
   }
   if (r === 1 || c === 1) {
      return 1;
   }

   cache[row_col] =
      gridTraveller(r - 1, c, cache) + gridTraveller(r, c - 1, cache);
   return cache[row_col];
}

console.log(gridTraveller(8, 8));
