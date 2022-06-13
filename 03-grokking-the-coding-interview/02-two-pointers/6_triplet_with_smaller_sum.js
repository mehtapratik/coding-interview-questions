/*
Given an array arr of unsorted numbers and a target sum, count all triplets in it such that 
arr[i] + arr[j] + arr[k] < target where i, j, and k are three different indices. 
Write a function to return the count of such triplets.

Example 1:
Input: [-1, 0, 2, 3], target=3 
Output: 2
Explanation: There are two triplets whose sum is less than the target: [-1, 0, 3], [-1, 0, 2]

Example 2:
Input: [-1, 4, 2, 1, 3], target=5 
-1, 1, 2, 3, 4 = 3
Output: 4
Explanation: There are four triplets whose sum is less than the target: [-1, 1, 4], [-1, 1, 3], [-1, 1, 2], [-1, 2, 3]

*/

// O(N^2)T | O(N)S
// O(N)S is space required for sorting otherwise, O(1)S if array is already sorted
const triplet_with_smaller_sum = function (arr, target) {
   let count = 0;
   arr.sort((a, b) => a - b);
   for (let i = 0; i < arr.length; i++) {
      const x = arr[i];

      let start = i + 1;
      let end = arr.length - 1;
      while (start < end) {
         const y = arr[start];
         const z = arr[end];
         const currentSum = x + y + z;
         if (currentSum < target) {
            // Since you found currentSum less than target_sum,
            // sum of every number (z) from the end right before start (y) will be less than targt_sum,
            // so just increase the count by difference of end - start to indicate the fact
            // then increase start by one
            count += end - start;
            start++;
         } else {
            end--;
         }
      }
   }

   return count;
};

/*
Problem: Write a function to return the list of all such triplets instead of the count. 
How will the time complexity change in this case?
*/

// O(N^3) | O(N)S
// Ignoring the space required for the output array, the space complexity of the above algorithm will
// be O(N) which is required for sorting.
function triplet_with_smaller_sum(arr, target) {
   let triplets = [];

   arr.sort((a, b) => a - b);

   for (let i = 0; i < arr.length; i++) {
      const x = arr[i];

      let start = i + 1;
      let end = arr.length - 1;
      while (start < end) {
         const y = arr[start];
         const z = arr[end];
         const currentSum = x + y + z;
         if (currentSum < target) {
            // Since you found currentSum less than target_sum,
            // sum of every number (z) from the end right before start (y) will be less than targt_sum,
            // so we need to add every number from end up to start in triplet collection.
            for (let j = end; j > start; j--) {
               triplets.push(x, y, arr[j]);
            }
            start++;
         } else {
            end--;
         }
      }
   }

   return triplets;
}
