/*
Given an array, find the length of the smallest subarray in it which when sorted will sort the whole array.

Example 1:
Input: [1, 2, 5, 3, 7, 10, 9, 12]
Output: 5
Explanation: We need to sort only the subarray [5, 3, 7, 10, 9] to make the whole array sorted

Example 2:
Input: [1, 3, 2, 0, -1, 7, 10]
Output: 5
Explanation: We need to sort only the subarray [1, 3, 2, 0, -1] to make the whole array sorted

Example 3:
Input: [1, 2, 3]
Output: 0
Explanation: The array is already sorted

Example 4:
Input: [3, 2, 1]
Output: 3
Explanation: The whole array needs to be sorted.
*/

// O(N)T | O(1)S
const shortest_window_sort = function (arr) {
   let start = 0;
   let end = arr.length - 1;
   let minOutOfOrder = Infinity;
   let maxOutOfOrder = -Infinity;

   // find first out of order number from the left
   while (start < arr.length - 1 && arr[start] < arr[start + 1]) {
      start++;
   }

   // if your left side pointer is all the way to the right,
   // array is already sorted
   if (start === arr.length - 1) {
      return 0;
   }

   // find first out of order number from the right
   while (end > 0 && arr[end] > arr[end - 1]) {
      end--;
   }

   // between left and right side, find minimum and maximum numbers that are un-sorted
   for (let i = start; i <= end; i++) {
      minOutOfOrder = Math.min(minOutOfOrder, arr[i]);
      maxOutOfOrder = Math.max(maxOutOfOrder, arr[i]);
   }

   // find place for minimum unsortred number
   while (arr[start - 1] > minOutOfOrder && start > 0) {
      start--;
   }

   // find place for maximum unsorted number
   while (arr[end + 1] < maxOutOfOrder && end < arr.length - 1) {
      end++;
   }

   return end - start + 1;
};
