//
// INSTRUCTIONS
//
// Given two strings ‘s1’ and ‘s2’, find the length of the longest subsequence which is common in both the strings.
//
// A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without
// changing the order of the remaining elements.
//

//
// EXAMPLE
//
// Input: s1 = "abdca"
//        s2 = "cbda"
// Output: 3
// Explanation: The longest common subsequence is "bda".
//
// Input: s1 = "passport"
//        s2 = "ppsspt"
// Output: 5
// Explanation: The longest common subsequence is "psspt".
//

//
// CODE
//
function longestSubsequenceLength(string1, string2) {
   if (typeof string1 !== "string" || typeof string2 !== "string") {
      return 0;
   }

   const cache = {};
   // return recursive(0, 0);
   // return memoization(0, 0);
   // return tabulation();
   return tabulationCompressed();

   // O(2^(n+m))T | O(n + m)S
   function recursive(i, j) {
      if (i >= string1.length || j >= string2.length) {
         return 0;
      }

      if (string1[i] === string2[j]) {
         return 1 + recursive(i + 1, j + 1);
      }

      return Math.max(recursive(i + 1, j), recursive(i, j + 1));
   }

   // O(n * m)TS
   function memoization(i, j) {
      const CACHE_KEY = `${i},${j}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      if (i >= string1.length || j >= string2.length) {
         cache[CACHE_KEY] = 0;
      } else if (string1[i] === string2[j]) {
         cache[CACHE_KEY] = 1 + memoization(i + 1, j + 1);
      } else {
         cache[CACHE_KEY] = Math.max(
            memoization(i, j + 1),
            memoization(i + 1, j)
         );
      }
      return cache[CACHE_KEY];
   }

   // O(n * m)TS
   function tabulation() {
      // we need one extra row and col in the matrix to compare first char of each strings
      // against previous one (i-1) or (j-1).
      const table = Array(string1.length + 1)
         .fill(0)
         .map(() => Array(string2.length + 1).fill(0));

      for (let i = 1; i <= string1.length; i++) {
         for (let j = 1; j <= string2.length; j++) {
            const prevMatchCount = table[i - 1][j - 1];
            const match1 = table[i][j - 1];
            const match2 = table[i - 1][j];
            // `i-1` and `j-1` because we're populating dp table from 1st row and col leaving
            // an empty row and col as default values to compare as prev row/col
            if (string1[i - 1] === string2[j - 1]) {
               table[i][j] = prevMatchCount + 1;
            } else {
               table[i][j] = Math.max(match1, match2);
            }
         }
      }

      return table[string1.length][string2.length];
   }

   // O(n * m)T | O(min(n, m))S
   function tabulationCompressed() {
      // identify shorter and longer strings to create smallest possible
      // dp table for space optimization
      const longer = string1.length > string2.length ? string1 : string2;
      const shorter = string1.length > string2.length ? string2 : string1;

      // we need one extra row and col in the matrix to compare first char of each strings
      // against previous one (i-1) or (j-1).
      const table = Array(2)
         .fill(0)
         .map(() => Array(shorter.length + 1).fill(0));

      for (let i = 1; i <= longer.length; i++) {
         for (let j = 1; j <= shorter.length; j++) {
            const [currRowIdx, prevRowIdx] = [i % 2, (i - 1) % 2];
            const [currCellIdx, prevCellIdx] = [j, j - 1];
            const prevMatchCount = table[prevRowIdx][prevCellIdx];
            const match1 = table[currRowIdx][prevCellIdx];
            const match2 = table[prevRowIdx][currCellIdx];
            // `i-1` and `j-1` because we're populating dp table from 1st row and col leaving
            // an empty row and col as default values to compare as prev row/col
            if (longer[i - 1] === shorter[j - 1]) {
               table[currRowIdx][currCellIdx] = prevMatchCount + 1;
            } else {
               table[currRowIdx][currCellIdx] = Math.max(match1, match2);
            }
         }
      }

      return table[longer.length % 2][shorter.length];
   }

   // TODO: Write a logic to show actual subsequence based on DP table
}

//
// TEST
//
console.log(longestSubsequenceLength("abdca", "cbda"));
console.log(longestSubsequenceLength("passport", "ppsspt"));
