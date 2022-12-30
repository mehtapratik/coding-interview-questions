//
// INSTRUCTIONS
//
// Given two sequences ‘s1’ and ‘s2’, write a method to find the length of the shortest
// sequence which has ‘s1’ and ‘s2’ as subsequences.
//

//
// EXAMPLE
//
// Input: s1: "abcf" s2:"bdcf"
// Output: 5
// Explanation: The shortest common super-sequence (SCS) is "abdcf".
//
// Input: s1: "dynamic" s2:"programming"
// Output: 15
// Explanation: The SCS is "dynprogrammicng".
//

//
// CODE
//
function shortestSupersequence(x, y) {
   if (typeof x !== "string" || typeof y !== "string") {
      return 0;
   }

   const cache = {};

   // return recursive(0, 0);
   // return memoization(0, 0);
   // return tabulation();
   return tabulationCompressed();

   // O(2^(n + m))T | O(n + m)S
   function recursive(i, j) {
      if (i >= x.length) {
         return y.length - j;
      }
      if (j >= y.length) {
         return x.length - i;
      }

      if (x[i] === y[j]) {
         return 1 + recursive(i + 1, j + 1);
      } else {
         console.log(i, j, recursive(i + 1, j), recursive(i, j + 1));

         return 1 + Math.min(recursive(i + 1, j), recursive(i, j + 1));
      }
   }

   // O(n * m)TS
   function memoization(i, j) {
      const CACHE_KEY = `${i},${j}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      cache[CACHE_KEY] = (() => {
         if (i >= x.length) {
            return y.length - j;
         }
         if (j >= y.length) {
            return x.length - i;
         }

         if (x[i] === y[j]) {
            return 1 + memoization(i + 1, j + 1);
         } else {
            return 1 + Math.min(memoization(i + 1, j), memoization(i, j + 1));
         }
      })();

      return cache[CACHE_KEY];
   }

   // O(n * m)TS
   function tabulation() {
      const table = Array(x.length + 1)
         .fill(0)
         .map(() => Array(y.length + 1).fill(0));

      for (let i = 0; i < x.length; i++) {
         table[i + 1][0] = i + 1;
      }

      for (let j = 0; j < y.length; j++) {
         table[0][j + 1] = j + 1;
      }

      for (let i = 1; i <= x.length; i++) {
         for (let j = 1; j <= y.length; j++) {
            if (x[i - 1] === y[j - 1]) {
               table[i][j] = 1 + table[i - 1][j - 1];
            } else {
               table[i][j] = 1 + Math.min(table[i - 1][j], table[i][j - 1]);
            }
         }
      }

      return table[x.length][y.length];
   }

   // O(n * m)T | O(min(n, m))S
   function tabulationCompressed() {
      const shorter = x.length <= y.length ? x : y;
      const longer = x.length <= y.length ? y : x;
      const table = Array(2)
         .fill(0)
         .map(() => Array(shorter).fill(0));

      for (let j = 0; j < shorter.length; j++) {
         table[0][j + 1] = j + 1;
      }

      for (let i = 1; i <= longer.length; i++) {
         table[i % 2][0] = i;
         for (let j = 1; j <= shorter.length; j++) {
            if (longer[i - 1] === shorter[j - 1]) {
               table[i % 2][j] = 1 + table[(i - 1) % 2][j - 1];
            } else {
               table[i % 2][j] =
                  1 + Math.min(table[(i - 1) % 2][j], table[i % 2][j - 1]);
            }
         }
      }

      return table[longer.length % 2][shorter.length];
   }

   // TODO: Write an implementation to identify shortest possible supersequence using all of above methods.
}

//
// TEST
//
console.log(shortestSupersequence("dynamic", "programming"));
console.log(shortestSupersequence("abcf", "bdcf"));
