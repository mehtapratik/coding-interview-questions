/*
Given an unsorted array containing numbers, find the smallest missing positive number in it.

Example 1:
Input: [-3, 1, 5, 4, 2]
Output: 3
Explanation: The smallest missing positive number is '3'

Example 2:
Input: [3, -2, 0, 1, 2]
Output: 4

Example 3:
Input: [3, 2, 5, 1]
Output: 4
*/
const find_first_smallest_missing_positive = function (nums) {
   const len = nums.length;

   let i = 0;
   while (i < len) {
      const j = nums[i] - 1;
      if (nums[i] < 1 || nums[i] > len || nums[i] === nums[j]) {
         i++;
      } else {
         [nums[i], nums[j]] = [nums[j], nums[i]];
      }
   }

   for (i = 0; i < len; i++) {
      if (nums[i] !== i + 1) return i + 1;
   }
   return -1;
};
