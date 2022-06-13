/*
Given an array containing 0s and 1s, if you are allowed to replace no more than ‘k’ 0s with 1s, 
find the length of the longest contiguous subarray having all 1s.

Example 1:
Input: Array=[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2
Output: 6
Explanation: Replace the '0' at index 5 and 8 to have the longest contiguous subarray of 1s having length 6.

Example 2:
Input: Array=[0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], k=3
Output: 9
Explanation: Replace the '0' at index 6, 9, and 10 to have the longest contiguous subarray of 1s having length 9.
*/

const length_of_longest_substring = function (arr, k) {
   let windowStart = 0;
   let ones = 0;
   let longestLength = 0;

   for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
      const current = arr[windowEnd];
      if (current === 1) ones++;

      if (windowEnd - windowStart + 1 - ones > k) {
         const former = arr[windowStart];
         if (former === 1) ones--;
         windowStart++;
      }

      longestLength = Math.max(longestLength, windowEnd - windowStart + 1);
   }

   return longestLength;
};

console.log(length_of_longest_substring([0, 0, 0, 1], 1));
