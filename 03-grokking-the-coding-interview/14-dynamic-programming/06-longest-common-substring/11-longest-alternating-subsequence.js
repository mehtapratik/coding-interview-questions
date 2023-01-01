//
// INSTRUCTIONS
//
// Given a number sequence, find the length of its Longest Alternating Subsequence (LAS).
// A subsequence is considered alternating if its elements are in alternating order.
//
// A three element sequence (a1, a2, a3) will be an alternating sequence if its elements
// hold one of the following conditions:
//
// {a1 > a2 < a3 } or { a1 < a2 > a3}.
//

//
// EXAMPLE
//
// Input: {1,2,3,4}
// Output: 2
// Explanation: There are many LAS: {1,2}, {3,4}, {1,3}, {1,4}
//
// Input: {3,2,1,4}
// Output: 3
// Explanation: The LAS are {3,2,4} and {2,1,4}.
//
// Input: {1,3,2,4}
// Output: 4
// Explanation: The LAS is {1,3,2,4}.
//

//
// EXPLANATION
//
// A basic brute-force solution could be to try finding the LAS starting from every number in both
// ascending and descending order.So for every index ‘i’ in the given array, we will have
// three options:
//   1. If the element at ‘i’ is bigger than the last element we considered, we include the element
//      at ‘i’ and recursively process the remaining array to find the next element in descending order.
//   2. If the element at ‘i’ is smaller than the last element we considered, we include the element
//      at ‘i’ and recursively process the remaining array to find the next element in ascending order.
//   3. In addition to the above two cases, we can always skip the element ‘i’ to recurse for the
//      remaining array.This will ensure that we try all subsequences.
// LAS would be the maximum of the above three subsequences.
//

//
// CODE
//
function las(sequence) {
   if (Array.isArray(sequence) === false || sequence.length === 0) {
      return 0;
   }

   const cache = {};
   // start two recursive calls.
   // one that assumes that first two numbers are in ascending order and
   // second that assumes that first two numbers are in descending order.
   // longest length returned by either of this recursive call will be the answer.
   // return Math.max(memoization(-1, 0, "asc"), memoization(-1, 0, "dsc"));
   return tabulation();

   // O(n^2)TS
   function memoization(prevIdx, currIdx, order) {
      const CACHE_KEY = `${prevIdx}|${currIdx}|${order}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      cache[CACHE_KEY] = (() => {
         // base case: you're at the end of the sequence
         if (currIdx >= sequence.length) return 0;

         // include current number in alternating subsequence calculation if...
         //   1. we're starting a subsequence from this (currIdx) position (prevIdx = -1)
         //   OR
         //   2. prev and current numbers are in expected order per `order` parameter
         let includeLength = 0;
         if (order === "asc") {
            if (prevIdx === -1 || sequence[prevIdx] < sequence[currIdx]) {
               // since we want to identify length of alternating subsequence
               // we will look for next number in descending order
               includeLength = 1 + memoization(currIdx, currIdx + 1, "dsc");
            }
         } else {
            if (prevIdx === -1 || sequence[prevIdx] > sequence[currIdx]) {
               // since we want to identify length of alternating subsequence
               // we will look for next number in ascending order
               includeLength = 1 + memoization(currIdx, currIdx + 1, "asc");
            }
         }

         // exclude current number in alternating subsequence length calculation
         const excludeLength = memoization(prevIdx, currIdx + 1, order);

         return Math.max(includeLength, excludeLength);
      })();

      return cache[CACHE_KEY];
   }

   // O(n^2)T | O(n)S
   function tabulation() {
      // by default every number is sequence are 1 count long if they don't alternate
      const asc = Array(sequence.length).fill(1);
      const dsc = Array(sequence.length).fill(1);

      let maxLength = 0;
      for (let i = 0; i < sequence.length; i++) {
         for (let j = 0; j < i; j++) {
            if (sequence[i] < sequence[j]) {
               // numbers are in desc order, e.g. 3 and 2 in 1, 3, 2 series.
               // therefore, former two number must be in ascending order e.g. 1 and 3 in 1, 3, 2 series.
               asc[i] = Math.max(asc[i], dsc[j] + 1);
               maxLength = Math.max(maxLength, asc[i]);
            } else if (sequence[i] > sequence[j]) {
               // numbers are in desc order, e.g. 3 and 2 in 1, 3, 2 series.
               // therefore, former two number must be in ascending order e.g. 1 and 3 in 1, 3, 2 series.
               dsc[i] = Math.max(dsc[i], asc[j] + 1);
               maxLength = Math.max(maxLength, dsc[i]);
            }
         }
      }

      return maxLength;
   }
}

//
// TEST
//
console.log(las([1, 2, 3, 4]));
console.log(las([3, 2, 1, 4]));
console.log(las([1, 3, 2, 4]));
