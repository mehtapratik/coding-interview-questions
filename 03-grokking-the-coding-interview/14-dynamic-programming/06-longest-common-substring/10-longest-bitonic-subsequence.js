//
// INSTRUCTIONS
//
// Given a number sequence, find the length of its Longest Bitonic Subsequence (LBS).
// A subsequence is considered Bitonic if it is monotonically increasing and then
// monotonically decreasing.
//

//
// EXAMPLE
//
// Input: {4,2,3,6,10,1,12}
// Output: 5
// Explanation: The LBS is {2,3,6,10,1}.
//
// Input: {4,2,5,9,7,6,10,3,1}
// Output: 7
// Explanation: The LBS is {4,5,9,7,6,3,1}.
//

//
// EXPLANATION
//
// A basic brute-force solution could be to try finding the Longest Decreasing Subsequences (LDS),
// starting from every number in both directions.So for every index ‘i’ in the given array,
// we will do two things:
//   1. Find LDS starting from ‘i’ to the end of the array.
//   2. Find LDS starting from ‘i’ to the beginning of the array.
// LBS would be the maximum sum of the above two subsequences.
//

//
// CODE
//
function longestBitonicSubsequence(sequence) {
   if (Array.isArray(sequence) === false || sequence.length === 0) {
      return 0;
   }

   // return memoization();
   return tabulation();

   // O(n^2)TS
   function memoization() {
      const fwdCache = {};
      const rwdCache = {};
      let maxLength = 0;
      for (let i = 0; i < sequence.length; i++) {
         // get length of longest decreasing subsequence going backward from `i`th index
         const fwdLength = getLDSLength(-1, i, "rwd");
         // get length of longest decreasing subsequence going forward from `i`th index
         const rwdLength = getLDSLength(-1, i, "fwd");
         // since both length includes `i`th number in its count, decrease 1 in sum
         maxLength = Math.max(maxLength, fwdLength + rwdLength - 1);
      }

      return maxLength;

      function getLDSLength(prevIdx, currIdx, dir = "fwd") {
         const CACHE_KEY = `${prevIdx},${currIdx}`;
         const cache = dir === "fwd" ? fwdCache : rwdCache;
         if (CACHE_KEY in cache) return cache[CACHE_KEY];

         cache[CACHE_KEY] = (() => {
            if (currIdx < 0 || currIdx >= sequence.length) return 0;

            const nextIdx = dir === "rwd" ? currIdx - 1 : currIdx + 1;
            let includeLength = 0;
            // include current number if...
            // 1. we're trying to find lengt of LDS from current position (prevIdx = -1)
            // 2. or if previous number is smaller than current number
            if (prevIdx === -1 || sequence[prevIdx] > sequence[currIdx]) {
               includeLength = 1 + getLDSLength(currIdx, nextIdx, dir);
            }

            // try to find series length of excluding current number in series
            const excludeLength = getLDSLength(prevIdx, nextIdx, dir);

            return Math.max(includeLength, excludeLength);
         })();

         return cache[CACHE_KEY];
      }
   }

   // O(n^2)T | O(n)S
   function tabulation() {
      const tableRwd = Array(sequence.length).fill(0);
      for (let i = 0; i < sequence.length; i++) {
         tableRwd[i] = 1;
         for (let j = i - 1; j >= 0; j--) {
            if (sequence[j] < sequence[i]) {
               tableRwd[i] = Math.max(tableRwd[i], tableRwd[j] + 1);
            }
         }
      }

      const tableFwd = Array(sequence.length).fill(0);
      for (let i = sequence.length - 1; i >= 0; i--) {
         tableFwd[i] = 1;
         for (let j = i + 1; j < sequence.length; j++) {
            if (sequence[j] < sequence[i]) {
               tableFwd[i] = Math.max(tableFwd[i], tableFwd[j] + 1);
            }
         }
      }

      let maxLength = 0;
      for (let i = 0; i < sequence.length; i++) {
         maxLength = Math.max(maxLength, tableRwd[i] + tableFwd[i] - 1);
      }

      return maxLength;
   }
}

//
// TEST
//
console.log(
   `Length of Longest Bitonic Subsequence: ${longestBitonicSubsequence([
      4, 2, 3, 6, 10, 1, 12,
   ])}`
);

console.log(
   `Length of Longest Bitonic Subsequence: ${longestBitonicSubsequence([
      4, 2, 5, 9, 7, 6, 10, 3, 1,
   ])}`
);
