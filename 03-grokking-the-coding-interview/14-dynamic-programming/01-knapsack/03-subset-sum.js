//
// INSTRUCTIONS
//
// Given a set of positive numbers, determine if a subset exists whose sum is equal to a given number ‘S’.
//

//
// EXAMPLE
//
// Example 1: #
// Input: {1, 2, 3, 7}, S=6
// Output: True
// The given set has a subset whose sum is '6': {1, 2, 3}
//
// Example 2: #
// Input: {1, 2, 7, 1, 5}, S=10
// Output: True
// The given set has a subset whose sum is '10': {1, 2, 7}
//
// Example 3: #
// Input: {1, 3, 4, 8}, S=6
// Output: False
// The given set does not have any subset whose sum is equal to '6'.
//

//
// CODE
//
function subsetSum(nums, targetSum) {
   if (nums.length === 0 || typeof targetSum !== "number") {
      return false;
   }

   // return recursiveDfs(nums, 0, 0, targetSum);
   // return topDownMemo(nums, 0, 0, targetSum);
   // return bottomUp1(nums, targetSum);
   return bottomUp2(nums, targetSum);

   //O(2^n)TS
   function recursiveDfs(nums, index, currentSum, targetSum) {
      if (currentSum === targetSum) {
         return true;
      }

      if (currentSum > targetSum || index >= nums.length) {
         return false;
      }

      if (recursiveDfs(nums, index + 1, currentSum + nums[index], targetSum)) {
         return true;
      } else {
         return recursiveDfs(nums, index + 1, currentSum, targetSum);
      }
   }

   //O(n x s)TS
   function topDownMemo(nums, index, currentSum, targetSum, memo = []) {
      if (currentSum === targetSum) {
         return true;
      }

      if (currentSum > targetSum || index >= nums.length) {
         return false;
      }

      memo[index] = memo[index] || [];
      if (typeof memo[index][currentSum] === "undefined") {
         memo[index][currentSum] =
            topDownMemo(nums, index + 1, currentSum + nums[index], targetSum) ||
            topDownMemo(nums, index + 1, currentSum, targetSum);
      }

      return memo[index][currentSum];
   }

   // O(n x s)TS
   function bottomUp1(nums, targetSum) {
      const table = new Array(nums.length)
         .fill(false)
         .map(() => Array(targetSum + 1).fill(false));

      for (let i = 0; i < nums.length; i++) {
         table[i][0] = true;
      }

      for (let s = 1; s <= targetSum; s++) {
         if (s === nums[0]) {
            table[0][s] = true;
         }
      }

      for (let i = 1; i < nums.length; i++) {
         for (let s = 1; s <= targetSum; s++) {
            const prevRow = table[i - 1];
            table[i][s] = prevRow[s] || prevRow[s - nums[i]];
         }
      }

      return table[nums.length - 1][targetSum];
   }

   // O(n x s)T | O(s)S
   function bottomUp2(nums, targetSum) {
      const table = Array(targetSum + 1).fill(false);
      table[0] = true;

      for (let i = 0; i < nums.length; i++) {
         for (let s = targetSum; s > 0; s--) {
            table[s] = !!(table[s] || table[s - nums[i]]);
         }
      }

      return table[targetSum];
   }
}

//
// TEST
//
console.log(subsetSum([1, 2, 3, 7], 6));
console.log(subsetSum([1, 2, 7, 1, 5], 10));
console.log(subsetSum([1, 3, 4, 8], 6));
