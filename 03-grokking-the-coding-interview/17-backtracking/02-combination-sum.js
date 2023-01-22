//
// INSTRUCTIONS
//
// Given an array of positive integers `nums` and an integer `sum`, The task is to find
// all unique combinations in `nums` where the sum is equal to `sum`.
//
// The same repeated number may be chosen from nums an unlimited number of times.
// Elements in a combination (n1, n2, ..., nk) must be printed in non-descending
// order. (ie, n1 <= n2 <= ... <= nk). If there is no combination possible
// print [].
//

//
// EXAMPLE
//
// Inputs:
//                arr = 2, 4, 6, 8, x = 8
// Output:
//                [
//                  [2, 2, 2, 2],
//                  [2, 2, 4],
//                  [2, 6],
//                  [4, 4],
//                  [8]
//                ]
//

//
// CODE
//
function combinationalSum(nums, sum) {
   const results = [];
   // backtrack1(0, sum, []); // good
   backtrack2(0, sum, []); // better
   return results;

   // O(n ^ (t/m))TS
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
