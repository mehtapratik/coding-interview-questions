//
// INSTRUCTIONS
//
// Given a set of positive numbers, find the total number of subsets whose sum
// is equal to a given number ‘S’.

//
// EXAMPLE
//
// Example 1:
// Input: {1, 1, 2, 3}, S=4
// Output: 3
// The given set has '3' subsets whose sum is '4': {1, 1, 2}, {1, 3}, {1, 3}
// Note that we have two similar sets {1, 3}, because we have two '1' in our input.
//
// Example 2:
// Input: {1, 2, 7, 1, 5}, S=9
// Output: 3
// The given set has '3' subsets whose sum is '9': {2, 7}, {1, 7, 1}, {1, 2, 1, 5}
//

//
// CODE
//
function countOfSubsetSum(numbers, targetSum) {
   const cache = [];
   // return recursiveDfs(0, targetSum);
   // return memoized(0, targetSum);
   return bottomUp();

   // O(2^n)T | O(n)S
   function recursiveDfs(index, remainder) {
      if (remainder === 0) {
         return 1;
      }
      if (remainder < 0) {
         return 0;
      }
      if (index >= numbers.length) {
         return 0;
      }

      const includeCount = recursiveDfs(index + 1, remainder - numbers[index]);
      const excludeCount = recursiveDfs(index + 1, remainder);
      return includeCount + excludeCount;
   }

   // O(n * s)TS
   function memoized(index, remainder) {
      cache[index] = cache[index] || {};
      if (remainder in cache[index]) {
         return cache[index][remainder];
      }
      if (remainder === 0) {
         return 1;
      }
      if (remainder < 0) {
         return 0;
      }
      if (index >= numbers.length) {
         return 0;
      }

      const includeCount = memoized(index + 1, remainder - numbers[index]);
      const excludeCount = memoized(index + 1, remainder);
      cache[index][remainder] = includeCount + excludeCount;
      return cache[index][remainder];
   }

   // O(n * s)T | O(s)S
   function bottomUp() {
      const dp = Array(targetSum + 1).fill(0);

      dp[0] = 1;

      for (let i = 0; i <= numbers.length; i++) {
         for (let j = targetSum; j > 0; j--) {
            dp[j] += dp[j - numbers[i]] || 0;
         }
      }

      return dp[targetSum];
   }
}

//
// TEST
//
console.log(countOfSubsetSum([1, 1, 2, 3], 4));
console.log(countOfSubsetSum([1, 2, 7, 1, 5], 2));
console.log(countOfSubsetSum([1, 1, 1, 1, 10], 100));
