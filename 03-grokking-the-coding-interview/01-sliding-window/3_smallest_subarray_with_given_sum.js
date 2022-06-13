/*

Given an array of positive numbers and a positive number ‘S,’ find the length of the smallest 
contiguous subarray whose sum is greater than or equal to ‘S’. Return 0 if no such subarray 
exists.

Input: [2, 1, 5, 2, 3, 2], S=7 
Output: 2
Explanation: The smallest subarray with a sum greater than or equal to '7' is [5, 2].

Input: [2, 1, 5, 2, 8], S=7 
Output: 1
Explanation: The smallest subarray with a sum greater than or equal to '7' is [8].

Input: [3, 4, 1, 1, 6], S=8 
Output: 3
Explanation: Smallest subarrays with a sum greater than or equal to '8' are [3, 4, 1] or [1, 1, 6].
*/

const smallest_subarray_with_given_sum = function (s, arr) {
   let windowLength = Infinity;

   let currentSum = 0;
   let from = 0;
   for (let to = 0; to < arr.length; to++) {
      currentSum += arr[to];
      while (currentSum >= s) {
         // +1 is to include from index in length 
         // (so, idx subarray from idx 2 to 3 is 2 length, not 1)
         windowLength = Math.min(windowLength, to - from + 1); 
         currentSum -= arr[from];
         from += 1;
      }
   }
  return windowLength === Infinity ? 0 : windowLength;
};