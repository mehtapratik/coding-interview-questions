//
// INSTRUCTIONS
//
// Given a number ‘n’, write a function to return all structurally unique Binary Search Trees (BST) that
// can store values 1 to ‘n’?
//

//
// EXAMPLE
//
// Input: 3
// Output: List containing root nodes of all structurally unique BSTs.
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
// PREPARATION
//
class TreeNode {
   constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
   }
}

//
// CODE
//
const find_unique_trees = function (n) {
   if (n <= 0) {
      return 0;
   }

   return dfs(1, n);

   function dfs(from, to) {
      if (from > to) {
         return [null];
      }

      const result = [];
      for (let i = from; i <= to; i++) {
         const leftSide = dfs(from, i - 1);
         const rightSide = dfs(i + 1, to);
         for (let left of leftSide) {
            for (let right of rightSide) {
               result.push(new TreeNode(i, left, right));
            }
         }
      }

      return result;
   }
};

//
// TEST
//
console.log(find_unique_trees(3).length);

//
// COMPLEXITY ANALYSIS
//
// O(n * 2^n)T | O(2^N)S
