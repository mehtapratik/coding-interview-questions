//
// INSTRUCTIONS
//
// Given an array of distinct positive integers candidates and a target integer target,
// return a list of all unique combinations of candidates where the chosen numbers sum
// to target.You may return the combinations in any order.
//
// The same number may be chosen from candidates an unlimited number of times. Two
// combinations are unique if the frequency of at least one of the chosen numbers is
// different.

//
// EXAMPLE
//
// Example 1:
// Input: candidates = [2, 3, 6, 7], target = 7
// Output: [[2, 2, 3], [7]]
// Explanation: The elements in these two combinations sum up to 7.
//
// Example 2:
// Input: candidates = [2, 4, 6, 8], target = 10
// Output: [[2,2,2,2,2], [2,2,2,4], [2,2,6], [2,4,4], [2,8], [4,6]]
// Explanation: The elements in these six combinations sum up to 10.
//

//
// CODE
//
function combinationalSum(nums, sum) {
   const results = [];
   // backtrack1(0, sum, []); // good
   backtrack2(0, sum, []); // better
   return results;

   // O(n ^ (t/m))T | O(t/m)S
   // Where n the `nums`, T be the `sum`, and M be the minimal value within the `nums`.
   function backtrack1(i, remainder, result) {
      if (i >= nums.length || remainder <= 0) {
         if (remainder === 0) {
            results.push([...result]);
         }
         return results;
      }

      for (let j = i; j < nums.length; j++) {
         result.push(nums[j]);
         backtrack1(j, remainder - nums[j], result);
         result.pop();
      }

      return results;
   }

   // O(2 ^ t/m)TS
   function backtrack2(i, remainder, result) {
      if (i >= nums.length || remainder <= 0) {
         if (remainder === 0) {
            results.push([...result]);
         }
         return results;
      }

      // include current number from nums array at ith index
      result.push(nums[i]);
      backtrack2(i, remainder - nums[i], result);
      result.pop(nums[i]);

      // exclude current number from nums array at ith index
      backtrack2(i + 1, remainder, result);

      return results;
   }
}

//
// TEST
//
console.log(combinationalSum([4, 6, 2, 8, 10], 8));

let candidates = [2, 3, 6, 7];
let target = 7;
console.log(combinationSum(candidates, target)); // expected output: [[2, 2, 3], [7]]

// Test case 2
candidates = [2, 3, 5];
target = 8;
console.log(combinationSum(candidates, target)); // expected output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]

// Test case 3
candidates = [];
target = 8;
console.log(combinationSum(candidates, target)); // expected output: []

// Test case 4
candidates = [5, 10, 15];
target = 20;
console.log(combinationSum(candidates, target)); // expected output: [[5,5,5,5], [5,5,10], [5,15], [10,10]]

// Test case 5
candidates = [2, 4, 6, 8];
target = 10;
console.log(combinationSum(candidates, target)); // expected output: [[2,2,2,2,2], [2,2,2,4], [2,2,6], [2,4,4], [2,8], [4,6]]

// Test case 6
candidates = [2, 3, 5];
target = 0;
console.log(combinationSum(candidates, target)); // expected output: [[]]
