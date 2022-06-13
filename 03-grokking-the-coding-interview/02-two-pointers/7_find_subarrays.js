/*
Given an array with positive numbers and a positive target number, find all of its contiguous subarrays whose product is less than the target number.

Example 1:
Input: [2, 5, 3, 10], target=30 
Output: [2], [5], [2, 5], [3], [5, 3], [10]
Explanation: There are six contiguous subarrays whose product is less than the target.

Example 2:
Input: [8, 2, 6, 5], target=50 
Output: [8], [2], [8, 2], [6], [2, 6], [5], [6, 5] 
Explanation: There are seven contiguous subarrays whose product is less than the target.
*/

// O(N^3)T | O(N)S
const find_subarrays = function (arr, target) {
   const subArrays = [];

   let left = 0;
   let product = 1;

   // N Time
   for (let right = 0; right < arr.length; right++) {
      product *= arr[right];
      while (product >= target && left < arr.length) {
         product /= arr[left];
         left++;
      }

      const tempList = [];
      // N time
      for (let i = right; i > left - 1; i--) {
         tempList.push(arr[i]);
         // spread operator to ensure array is not inserted by ref
         // Can be up to N Time
         subArrays.push([...tempList]);
      }
   }

   return subArrays;
};
