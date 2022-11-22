//
// INSTRUCTIONS
//
// Given a set of positive numbers, find if we can partition it into two subsets such that
// the sum of elements in both subsets is equal.
//

//
// EXAMPLE
//
// Example 1:
// Input: {1, 2, 3, 4}
// Output: True
// Explanation: The given set can be partitioned into two subsets with equal sum: {1, 4} & {2, 3}
//
// Example 2:
// Input: {1, 1, 3, 4, 7}
// Output: True
// Explanation: The given set can be partitioned into two subsets with equal sum: {1, 3, 4} & {1, 7}
//
// Example 3:
// Input: {2, 3, 4, 6}
// Output: False
// Explanation: The given set cannot be partitioned into two subsets with equal sum.
//

//
// CODE
//
function equalSubsetSumPartition(nums) {
   // return false if numbers array is empty
   if (nums.length === 0) {
      return false;
   }

   // sum of all numbers in array
   const sum = nums.reduce((p = 0, c) => p + c);

   // you cannot create equal sub subset sum if sum of all numbers in array is an odd number
   if (sum % 2 === 1) {
      return false;
   }

   // return recursive(nums, 0, sum / 2);
   // return topDownMemoization(nums, 0, sum / 2);
   return bottomUpTabulation(nums, sum / 2);

   // The time complexity of the above algorithm is exponential O(2^n), where ‘n’ represents
   // the total number. The space complexity is O(n), which will be used to store the recursion stack.
   function recursive(nums, index, remainingSum) {
      if (remainingSum === 0) {
         return true;
      }

      // if index exceeds number boundary or numbers array is empty
      if (index >= nums.length) {
         return false;
      }

      // keep current number and include it in the sum
      if (recursive(nums, index + 1, remainingSum - nums[index])) {
         return true;
      } else {
         // skip current number - do not include in the sum
         return recursive(nums, index + 1, remainingSum);
      }
   }

   // O(m * n)T, where m is the subSetSum, and n is the number of array elements.
   // We iteratively fill the array of size m x n.
   // O(m * n)S, where m is the subSetSum, and n is the number of array elements.
   // We are using a 2 dimensional array dp of size m x n.
   function topDownMemoization(nums, index, remainingSum, cache = []) {
      // Remaining sum of zero indicates that we have found a set of numbers that from the array
      // that adds upto desired sum (1/2 of all numbers sum from the original array).
      if (remainingSum === 0) {
         return true;
      }

      // if index exceeds number boundary or numbers array is empty
      if (index >= nums.length) {
         return false;
      }

      // check if similar value is already calculated
      cache[index] = cache[index] || [];
      if (typeof cache[index][remainingSum] !== "undefined") {
         return cache[index][remainingSum];
      }

      // keep current number and include it in the sum
      if (
         topDownMemoization(nums, index + 1, remainingSum - nums[index], cache)
      ) {
         cache[index][remainingSum] = true;
         return true;
      } else {
         // skip current number - do not include in the sum
         cache[index][remainingSum] = topDownMemoization(
            nums,
            index + 1,
            remainingSum,
            cache
         );
      }

      return cache[index][remainingSum];
   }

   // O(m * n)T, where m is the subSetSum, and n is the number of array elements.
   // We iteratively fill the array of size m x n.
   // O(m)S, as we use an array of size m to store the result of subproblems.
   function bottomUpTabulation(nums, sum) {
      // We must understand that for any array element i, we need results of the previous iteration
      // (i - 1) only. Hence, we could achieve the same using a one - dimensional array as well by
      // traversing in reverse in inner loop and therefore preserving output of previous row before
      // erasing it
      const cache = Array(sum + 1).fill(false);

      // sum = 0 - we can always have '0' sum with an empty set
      cache[0] = true;

      for (let i = 0; i < nums.length; i++) {
         for (let s = sum; s > 0; s--) {
            // if we can get the sum 's' without the number at index 'i' (skip)
            // OR
            // if we can find a subset to get the remaining sum (keep)
            // result = skip current no || keep current number
            cache[s] = !!cache[s] || !!cache[s - nums[i]];
         }
      }

      // the bottom-right corner will have our answer.
      return cache[sum];
   }
}

//
// TEST
//
console.log(equalSubsetSumPartition([1, 1, 3, 4, 7]));
console.log(equalSubsetSumPartition([-1, 2, 2]));
console.log(equalSubsetSumPartition([-1, 2, 1]));
console.log(equalSubsetSumPartition([1, 2, 3, 4]));
console.log(equalSubsetSumPartition([3]));
console.log(equalSubsetSumPartition([4]));
console.log(equalSubsetSumPartition([]));
console.log(equalSubsetSumPartition([2, 4]));
console.log(equalSubsetSumPartition([2, 4, 2]));
console.log(equalSubsetSumPartition([2, 4, 3]));
console.log(equalSubsetSumPartition([1, 3, 4]));
console.log(
   equalSubsetSumPartition([
      5, 79, 2, 4, 8, 16, 32, 64, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100,
   ])
);
