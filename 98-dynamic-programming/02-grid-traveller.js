/*
There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). 
The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move 
either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take 
to reach the bottom-right corner.
*/

/*
Without Memoization: O(2^(r+c))T and O(r+c)S
With Memoization: O(r+c)TS
*/
function gridTraveller(r, c, cache = {}) {
   if (r === 0 || c === 0) {
      return 0;
   }
   if (r === 1 || c === 1) {
      return 1;
   }
   const cache_key = `${r},${c}`;
   if (cache_key in cache) {
      return cache[cache_key];
   }

   cache[cache_key] =
      gridTraveller(r - 1, c, cache) + gridTraveller(r, c - 1, cache);

   return cache[cache_key];
}

console.log(gridTraveller(8, 8));
