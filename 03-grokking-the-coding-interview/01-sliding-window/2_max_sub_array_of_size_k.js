/*
Given an array of positive numbers and a positive number ‘k,’ find the maximum sum 
of any contiguous subarray of size ‘k’.

Input: [2, 1, 5, 1, 3, 2], k=3 
Output: 9
Explanation: Subarray with maximum sum is [5, 1, 3]

Input: [2, 3, 4, 1, 5], k=2 
Output: 7
Explanation: Subarray with maximum sum is [3, 4].
*/

const max_sub_array_of_size_k = function (k, arr) {
   let maxSum = -Infinity;
   let maxFrom = -1;
   let currentSum = 0;
   let from = 0;
   for (let to = 0; to < arr.length; to++) {
      currentSum += arr[to];
      if (to - from === k - 1) {
         if (currentSum > maxSum) {
            maxSum = currentSum;
            maxFrom = from;
         }
         currentSum -= arr[from];
         from++;
      }
   }
   console.log(arr.slice(maxFrom, maxFrom + k));
   return maxSum;
};

const max_sub_array_of_size_k = function (k, arr) {
   let maxSum = -Infinity;
   let currentSum = 0;
   let from = 0;
   for (let to = 0; to < arr.length; to++) {
      currentSum += arr[to];
      if (to - from === k - 1) {
         maxSum = Math.max(currentSum, maxSum);
         currentSum -= arr[from];
         from++;
      }
   }
   return maxSum;
};
