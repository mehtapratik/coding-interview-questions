/*
   Given an array of unsorted numbers and a target number, find all unique quadruplets in it, whose sum is equal to the target number.

   Example 1:
   Input: [4, 1, 2, -1, 1, -3], target=1
   Output: [-3, -1, 1, 4], [-3, 1, 1, 2]
   Explanation: Both the quadruplets add up to the target.

   Example 2:
   Input: [2, 0, -1, 1, -2, 2], target=2
   Output: [-2, 0, 2, 2], [-1, 0, 1, 2]
   Explanation: Both the quadruplets add up to the target.
*/

// O(N^3)T | O(N)S
// O(N) Autixiliary space may be required for sorting
const search_quadruplets = function (arr, target) {
   arr.sort((a, b) => a - b);
   const quadruplets = [];
   for (let i = 0; i < arr.length - 3; i++) {
      if (i > 0 && arr[i] === arr[i - 1]) {
         continue;
      }
      for (j = i + 1; j < arr.length - 2; j++) {
         if (j > i + 1 && arr[j] === arr[j - 1]) {
            continue;
         }

         searchTuples(arr, i, j, target, quadruplets);
      }
   }
   return quadruplets;
};

function searchTuples(arr, i, j, targetSum, quadruplets) {
   let start = j + 1;
   let end = arr.length - 1;

   while (start < end) {
      const currentSum = arr[i] + arr[j] + arr[start] + arr[end];
      if (currentSum === targetSum) {
         quadruplets.push([arr[i], arr[j], arr[start], arr[end]]);
         start++;
         end--;
         while (start < end && arr[start] === arr[start - 1]) {
            start++;
         }
         while (end > start && arr[end] === arr[end + 1]) {
            end--;
         }
      } else if (currentSum > targetSum) {
         end--;
      } else {
         start++;
      }
   }
}
