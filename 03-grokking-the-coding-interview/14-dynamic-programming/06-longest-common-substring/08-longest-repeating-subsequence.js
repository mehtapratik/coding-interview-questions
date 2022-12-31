//
// INSTRUCTIONS
//
// Given a sequence, find the length of its longest repeating subsequence (LRS). A repeating
// subsequence will be the one that appears at least twice in the original sequence and is not
// overlapping (i.e. none of the corresponding characters in the repeating subsequences have
// the same index).
//

//
// EXAMPLE
//
// Input: “t o m o r r o w”
// Output: 2
// Explanation: The longest repeating subsequence is “or” {tomorrow}.
//
// Input: “a a b d b c e c”
// Output: 3
// Explanation: The longest repeating subsequence is “a b c” {a a b d b c e c}.
//
// Input: “f m f f”
// Output: 2
// Explanation: The longest repeating subsequence is “f f” {f m f f, f m f f}. Please note the second last character is shared in LRS.
//

//
// CODE
//
function lrs(input) {
   if (typeof input !== "string") {
      return 0;
   }

   const cache = {};

   // return recursive(0, 0);
   // return memoization(0, 0);
   // return tabulation();
   return tabulationCompressed();

   // O(2^n)T | O(n)S
   function recursive(i, j) {
      if (i === input.length || j === input.length) {
         return 0;
      }

      if (i !== j && input[i] === input[j]) {
         return 1 + recursive(i + 1, j + 1);
      } else {
         return Math.max(recursive(i + 1, j), recursive(i, j + 1));
      }
   }

   // O(n^2)TS
   function memoization(i, j) {
      const CACHE_KEY = `${i},${j}`;
      const CACHE_KEY_ALT = `${j},${i}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }
      if (CACHE_KEY_ALT in cache) {
         return cache[CACHE_KEY_ALT];
      }

      // O(n^2)TS
      cache[CACHE_KEY] = (() => {
         if (i >= input.length || j >= input.length) {
            return 0;
         }

         if (i !== j && input[i] === input[j]) {
            return 1 + memoization(i + 1, j + 1);
         } else {
            return Math.max(memoization(i + 1, j), memoization(i, j + 1));
         }
      })();
      // console.log(cache);
      return cache[CACHE_KEY];
   }

   // O(n^2)TS
   function tabulation() {
      const table = Array(input.length + 1)
         .fill(0)
         .map(() => Array(input.length + 1).fill(0));

      for (let i = 1; i <= input.length; i++) {
         for (let j = 1; j <= input.length; j++) {
            if (i !== j && input[i - 1] === input[j - 1]) {
               table[i][j] = 1 + table[i - 1][j - 1];
            } else {
               table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
            }
         }
      }

      return table[input.length][input.length];
   }

   // O(n^2)T | O(n)S
   function tabulationCompressed() {
      const table = Array(2)
         .fill(0)
         .map(() => Array(input.length + 1).fill(0));

      for (let i = 1; i <= input.length; i++) {
         for (let j = 1; j <= input.length; j++) {
            if (i !== j && input[i - 1] === input[j - 1]) {
               table[i % 2][j] = 1 + table[(i - 1) % 2][j - 1];
            } else {
               table[i % 2][j] = Math.max(
                  table[(i - 1) % 2][j],
                  table[i % 2][j - 1]
               );
            }
         }
      }

      return table[input.length % 2][input.length];
   }

   // TODO: Change above implementation to identify actual repeating subsequence instead of its length
}

//
// TEST
//
console.log(lrs("tomorrow"));
console.log(lrs("aabdbcec"));
console.log(lrs("fmff"));
