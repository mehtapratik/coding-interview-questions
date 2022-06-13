/*
Given an unsorted array containing numbers and a number ‘k’, find the first ‘k’ missing positive numbers in the array.

Example 1:
Input: [3, -1, 4, 5, 5], k=3
Output: [1, 2, 6]
Explanation: The smallest missing positive numbers are 1, 2 and 6.

Example 2:
Input: [2, 3, 4], k=3
Output: [1, 5, 6]
Explanation: The smallest missing positive numbers are 1, 5 and 6.

Example 3:
Input: [-2, -3, 4], k=2
Output: [1, 2]
Explanation: The smallest missing positive numbers are 1 and 2.
*/

const find_first_k_missing_positive = function (nums, k) {
   const missingNumbers = [];

   let i = 0;
   const n = nums.length;
   while (i < n) {
      const j = nums[i] - 1;
      if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[j]) {
         [nums[i], nums[j]] = [nums[j], nums[i]];
      } else {
         i++;
      }
   }

   const outOfPlaceNumbers = {};
   for (i = 0; i < n; i++) {
      if (missingNumbers.length < k && nums[i] !== i + 1) {
         missingNumbers.push(i + 1);
         outOfPlaceNumbers[nums[i]] = true;
      }
   }

   i = 1;
   while (missingNumbers.length < k) {
      const expected = i + n;
      if (!(expected in outOfPlaceNumbers)) {
         missingNumbers.push(expected);
      }
      i++;
   }

   return missingNumbers;
};

console.log(find_first_k_missing_positive([3, -1, 4, 5, 5], 3));
console.log(find_first_k_missing_positive([2, 3, 4], 3));
console.log(find_first_k_missing_positive([-2, -3, 4], 2));
