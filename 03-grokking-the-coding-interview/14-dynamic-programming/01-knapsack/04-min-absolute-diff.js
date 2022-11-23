//
// INSTRUCTIONS
//
// Given a set of positive numbers, partition the set into two subsets with minimum
// absolute difference between their subset sums.
//

//
// EXAMPLE
//
// Example 1:
// Input: {1, 2, 3, 9}
// Output: 3
// Explanation: We can partition the given set into two subsets where minimum absolute difference
// between the sum of numbers is '3'. Following are the two subsets: {1, 2, 3} & {9}.
//
// Example 2:
// Input: {1, 2, 7, 1, 5}
// Output: 0
// Explanation: We can partition the given set into two subsets where minimum absolute difference
// between the sum of number is '0'. Following are the two subsets: {1, 2, 5} & {7, 1}.
//
// Example 3:
// Input: {1, 3, 100, 4}
// Output: 92
// Explanation: We can partition the given set into two subsets where minimum absolute difference
// between the sum of numbers is '92'. Here are the two subsets: {1, 3, 4} & {100}.
//

//
// CODE
//
function minAbsoluteDiff(nums) {
   if (Array.isArray(nums) === false || nums.length === 0) {
      return -1;
   }

   //return recursiveDfs(nums, 0, 0, 0);
   // return topDownMemo(nums, 0, 0, 0);
   //return bottomUp1(nums);
   return bottomUp2(nums);

   // O(2^n)TS
   function recursiveDfs(nums, index, sum1, sum2) {
      if (index >= nums.length) {
         return Math.abs(sum1 - sum2);
      }

      if (typeof nums[index] !== "number") {
         return -1;
      }

      const diff1 = recursiveDfs(nums, index + 1, sum1 + nums[index], sum2);
      const diff2 = recursiveDfs(nums, index + 1, sum1, sum2 + nums[index]);

      return Math.min(diff1, diff2);
   }

   // O(n * (sum1, sum2))TS - We are using matrix of each number and their
   function tdMemo(nums, index, sum1, sum2, memo = []) {
      memo[index] = memo[index] || {};
      if (typeof memo[index][`${sum1}_${sum2}`] !== "undefined") {
         return memo[index][`${sum1}_${sum2}`];
      }
      if (typeof memo[index][`${sum2}_${sum1}`] !== "undefined") {
         return memo[index][`${sum2}_${sum1}`];
      }
      if (index >= nums.length) {
         return Math.abs(sum1 - sum2);
      }

      const diff1 = tdMemo(nums, index + 1, sum1 + nums[index], sum2, memo);
      const diff2 = tdMemo(nums, index + 1, sum1, sum2 + nums[index], memo);

      memo[index][`${sum1}_${sum2}`] = Math.min(diff1, diff2);

      return memo[index][`${sum1}_${sum2}`];
   }

   //O(n * s)TS
   function bottomUp1(nums) {
      const sum = nums.reduce((prev, current) => prev + current);
      const halfSum = Math.floor(sum / 2);

      const table = Array(nums.length)
         .fill(false)
         .map(() => Array(halfSum + 1).fill(false));

      nums.forEach((_, i) => (table[i][0] = true));

      for (let s = 0; s <= halfSum; s++) {
         table[0][s] = nums[0] === s;
      }

      for (let i = 1; i < nums.length; i++) {
         const prevRow = table[i - 1];
         const currentRow = table[i];
         for (let s = 1; s <= halfSum; s++) {
            currentRow[s] = prevRow[s] || prevRow[s - nums[i]];
         }
      }

      let sum1 = -1;
      for (sum1 = halfSum; sum1 >= 0; sum1--) {
         if (table[nums.length - 1][sum1] === true) {
            break;
         }
      }

      const sum2 = sum - sum1;

      return Math.abs(sum1 - sum2);
   }

   // O(n * s)T | O(s)S
   function bottomUp2(nums) {
      const sum = nums.reduce((previous, current) => previous + current);
      const halfSum = Math.floor(sum / 2);
      const table = Array(halfSum + 1);
      table[0] = true;

      for (let i = 0; i < nums.length; i++) {
         for (let s = halfSum; s >= 0; s--) {
            if (table[s] !== true) {
               table[s] = table[s - nums[i]];
            }
         }
      }

      let sum1 = -1;
      for (sum1 = halfSum; sum1 >= 0; sum1--) {
         if (table[sum1] === true) {
            break;
         }
      }

      const sum2 = sum - sum1;

      return Math.abs(sum1 - sum2);
   }
}

//
// TEST
//
console.log(minAbsoluteDiff([1, 2, 3, 9]));
console.log(minAbsoluteDiff([1, 2, 7, 1, 5]));
console.log(minAbsoluteDiff([1, 3, 100, 4]));
console.log(minAbsoluteDiff([]));
console.log(minAbsoluteDiff([-1]));
console.log(minAbsoluteDiff([0, 1, 2, "4"]));
