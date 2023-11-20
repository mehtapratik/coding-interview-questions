//
// INSTRUCTIONS
//
// Given an integer array nums, find the subarray with the largest sum, and return its sum.
//

//
// EXAMPLES
//
// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
//
// Example 2:
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.
//
// Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
//

//
// PREPARATION
//
// -2, 1, -3, 4, -1, 2, 1, -5, 4
// largestSum = 1
// currentsum = 5
// Take the first item as sum
//

//
// CODE
//
function solve(nums) {
   let [maxSum, currentSum] = [-Infinity, -Infinity];
   for (let num of nums) {
      currentSum += num;
      currentSum = Math.max(currentSum, num);
      maxSum = Math.max(maxSum, currentSum);
   }

   return maxSum;
}

//
// TEST
//
console.log(solve([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(solve([5, 4, -1, 7, 8]));
