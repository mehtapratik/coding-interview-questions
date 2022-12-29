//
// INSTRUCTIONS
//
// Given a number sequence, find the increasing subsequence with the highest sum. Write a method that returns the highest sum.
//

//
// EXAMPLE
//
// Input: {4,1,2,6,10,1,12}
// Output: 32
// Explanation: The increaseing sequence is {4,6,10,12}.
// Please note the difference, as the LIS is {1,2,6,10,12} which has a sum of '31'.
//
// Input: {-4,10,3,7,15}
// Output: 25
// Explanation: The increaseing sequences are {10, 15} and {3,7,15}.
//

//
// CODE
//
function maxSumIncreasingSubsequence(sequence) {
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

      let sumOfCurrentSequence = 0;
      if (prevIndex < 0 || sequence[prevIndex] < sequence[currIndex]) {
         sumOfCurrentSequence =
            sequence[currIndex] + recursive(currIndex, currIndex + 1);
      }

      const sumOfNextSequence = recursive(prevIndex, currIndex + 1);

      return Math.max(sumOfCurrentSequence, sumOfNextSequence);
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

         let sumOfCurrentSequence = 0;
         if (prevIndex === -1 || sequence[prevIndex] < sequence[currIndex]) {
            sumOfCurrentSequence =
               sequence[currIndex] + memoization(currIndex, currIndex + 1);
         }

         const sumOfNextSequence = memoization(prevIndex, currIndex + 1);

         return Math.max(sumOfCurrentSequence, sumOfNextSequence);
      })();

      return cache[CACHE_KEY];
   }

   // O(n^2) | O(n)S
   function tabulation() {
      const table = Array(sequence.length).fill(0);
      table[0] = sequence[0];

      let maxSum = 0;
      for (let afterIdx = 1; afterIdx < sequence.length; afterIdx++) {
         table[afterIdx] = sequence[afterIdx];
         for (let beforeIdx = 0; beforeIdx < afterIdx; beforeIdx++) {
            if (
               sequence[afterIdx] > sequence[beforeIdx] &&
               table[afterIdx] < table[beforeIdx] + sequence[afterIdx]
            ) {
               table[afterIdx] = sequence[afterIdx] + table[beforeIdx];
            }
         }
         maxSum = Math.max(maxSum, table[afterIdx]);
      }
      return maxSum;
   }

   // TODO: Write an implementation that shows chosen number for given max sum
}

//
// TEST
//
console.log(maxSumIncreasingSubsequence([4, 1, 2, 6, 10, 1, 12]));
console.log(maxSumIncreasingSubsequence([-4, 10, 3, 7, 15]));
