/*
Given an array of unsorted numbers and a target number, find a triplet in the array whose sum is as close to the target number as possible, return the sum of the triplet. If there are more than one such triplet, return the sum of the triplet with the smallest sum.

Example 1:
Input: [-2, 0, 1, 2], target=2
Output: 1
Explanation: The triplet [-2, 1, 2] has the closest sum to the target.

Example 2:
Input: [-3, -1, 1, 2], target=1
Output: 0
Explanation: The triplet [-3, 1, 2] has the closest sum to the target.

Example 3:
Input: [1, 0, 1, 1], target=100
Output: 3
Explanation: The triplet [1, 1, 1] has the closest sum to the target.
*/
// O(N^2)T | O(N)S - O(N) space is required for sorting
const triplet_sum_close_to_target = function (arr, target_sum) {
   let closestDiff = Infinity;

   arr.sort((a, b) => a - b);

   for (let i = 0; i < arr.length; i++) {
      const x = arr[i];

      let start = i + 1;
      let end = arr.length - 1;
      while (start < end) {
         const y = arr[start];
         const z = arr[end];
         const currentDiff = target_sum - (x + y + z);

         if (currentDiff === 0) return target_sum;
         else if (currentDiff > 0) start++;
         else end--;

         if (Math.abs(closestDiff) > Math.abs(currentDiff)) {
            closestDiff = currentDiff;
         }
      }
   }
   return target_sum - closestDiff;
};
