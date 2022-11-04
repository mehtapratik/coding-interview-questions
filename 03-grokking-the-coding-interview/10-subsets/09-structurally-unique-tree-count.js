//
// INSTRUCTIONS
//
// Given a number ‘n’, write a function to return the count of structurally unique
// Binary Search Trees (BST) that can store values 1 to ‘n’.
//

//
// EXAMPLE
//
// Input: 3
// Output: 5
// Explanation: Here are the 5 structurally unique BSTs storing all numbers from 1 to 3:
//
//   1              1            2           3           3
//    \              \         /   \        /           /
//     2              2       1     3      1           2
//      \            /                      \         /
//       3          3                        2       1
//
//

//
// CODE
//
const count_trees = function (n) {
   if (n <= 0) {
      return 0;
   }

   const cache = {};
   return bfs(n);

   function bfs(n) {
      if (n in cache) {
         return cache[n];
      }

      if (n <= 1) {
         return 1;
      }

      let count = 0;
      for (let i = 1; i <= n; i++) {
         const leftSide = bfs(i - 1);
         const rightSide = bfs(n - i);
         count += leftSide * rightSide;
      }

      cache[n] = count;

      return count;
   }
};

//
// TEST
//
console.log(count_trees(2));
console.log(count_trees(3));
console.log(count_trees(5));

//
// COMPLEXITY ANALYSIS
//
// O(N^2)T | O(N)S
