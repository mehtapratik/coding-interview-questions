//
// INSTRUCTIONS
//
// Given a number sequence, find the length of its Longest Increasing Subsequence (LIS). In an increasing
// subsequence, all the elements are in increasing order (from lowest to highest).
//

//
// EXAMPLE
//
// Input: {4,2,3,6,10,1,12}
// Output: 5
// Explanation: The LIS is {2, 3, 6, 10, 12}.
//
// Input: {-4,10,3,7,15}
// Output: 4
// Explanation: The LIS is {-4, 3, 7, 15}.
//

//
// CODE
//
function longestIncreasingSubsequence(sequence) {
   if (Array.isArray(sequence) === false || sequence.length === 0) {
      return 0;
   }

   const cache = {};
   // return recursive(-1, 0);
   // return memoization(-1, 0);
   return tabulation();

   // O(2^n)T | O(n)S
   function recursive(prevIndex, currIndex) {
      if (currIndex >= sequence.length) {
         return 0;
      }

      let currentSequenceLength = 0;
      if (prevIndex === -1 || sequence[prevIndex] < sequence[currIndex]) {
         currentSequenceLength = 1 + recursive(currIndex, currIndex + 1);
      }

      const nextSequenceLength = recursive(prevIndex, currIndex + 1);

      return Math.max(currentSequenceLength, nextSequenceLength);
   }

   // O(n^2)TS
   function memoization(prevIndex, currIndex) {
      const CACHE_KEY = `${prevIndex},${currIndex}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      cache[CACHE_KEY] = (() => {
         if (currIndex >= sequence.length) {
            return 0;
         }

         let currentSequenceLength = 0;
         if (prevIndex === -1 || sequence[prevIndex] < sequence[currIndex]) {
            currentSequenceLength = 1 + memoization(currIndex, currIndex + 1);
         }

         const nextSequenceLength = memoization(prevIndex, currIndex + 1);

         return Math.max(currentSequenceLength, nextSequenceLength);
      })();

      return cache[CACHE_KEY];
   }

   // O(n^2)T | O(n)S
   function tabulation() {
      const table = Array(sequence.length).fill(1);

      let maxLen = 0;
      for (let i = 1; i < sequence.length; i++) {
         for (let j = 0; j < i; j++) {
            if (sequence[i] > sequence[j] && table[i] <= table[j]) {
               table[i] = 1 + table[j];
               maxLen = Math.max(maxLen, table[i]);
            }
         }
      }

      return maxLen;
   }

   // TODO: Write implementation to identify the exact subseqnece instead of length of subsequence
}

//
// TEST
//
console.log(longestIncreasingSubsequence([4, 2, 3, 6, 10, 1, 12]));
console.log(longestIncreasingSubsequence([-4, 10, 3, 7, 15]));
