//
// INSTRUCTIONS
//
// Given a string and a pattern, write a method to count the number of times the pattern
// appears in the string as a subsequence.
//

//
// EXAMPLE
//
// Input: string: “baxmx”, pattern: “ax”
// Output: 2
// Explanation: {b"ax"mx, b"a"xm"x"}.
//
// Input: string: “tomorrow”, pattern: “tor”
// Output: 4
// Explanation: Following are the four occurences: {"to"mo"r"row, "to"mor"r"ow, "t"om"or"row, "t"om"o"r"r"ow}.
//

//
// CODE
//
function countPatterns(string, pattern) {
   if (
      typeof string !== "string" ||
      typeof pattern !== "string" ||
      string.length === 0 ||
      pattern.length > string.length
   ) {
      return 0;
   }

   const cache = {};
   // return recursive(0, 0);
   // return memoization(0, 0);
   // return tabulation();
   return tabulationCompressed();

   // O(2^(n))T | O(n)S where n is length of `string` and m is length of `pattern`
   function recursive(i, j) {
      // if we reached end of the pattern, it means we found 1 match in string
      if (j >= pattern.length) {
         return 1;
      }

      // if we reached end of string without reaching end of pattern (if condition above),
      // it means we failed to find given pattern
      if (i >= string.length) {
         return 0;
      }

      // include current character from input string if it matches with pattern character
      let c1 = 0;
      if (string[i] === pattern[j]) {
         c1 = recursive(i + 1, j + 1);
      }

      // exclude current character with a hope to find same pattern character
      // further in the string
      const c2 = recursive(i + 1, j);

      return c1 + c2;
   }

   // O(n^2)TS where n is length of `string` and m is length of `pattern`
   function memoization(i, j) {
      const CACHE_KEY = `${i},${j}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      cache[CACHE_KEY] = (() => {
         // if we reached end of the pattern, it means we found 1 match in string
         if (j >= pattern.length) {
            return 1;
         }

         // if we reached end of string without reaching end of pattern (if condition above),
         // it means we failed to find given pattern
         if (i >= string.length) {
            return 0;
         }

         // include current character from input string if it matches with pattern character
         let c1 = 0;
         if (string[i] === pattern[j]) {
            c1 = memoization(i + 1, j + 1);
         }

         // exclude current character with a hope to find same pattern character
         // further in the string
         const c2 = memoization(i + 1, j);

         return c1 + c2;
      })();

      return cache[CACHE_KEY];
   }

   // O(n * m)TS
   function tabulation() {
      const table = Array(string.length + 1)
         .fill(0)
         .map(() => Array(pattern.length + 1).fill(0));

      // for every empty pattern we have one match
      table[0][0] = 1;

      for (let i = 1; i <= string.length; i++) {
         // for every empty pattern we have one match
         table[i][0] = 1;
         for (let j = 1; j <= pattern.length; j++) {
            if (string[i - 1] === pattern[j - 1]) {
               table[i][j] = table[i - 1][j - 1];
            }
            table[i][j] += table[i - 1][j];
         }
      }

      return table[string.length][pattern.length];
   }

   // O(n * m)T | O(m)S
   function tabulationCompressed() {
      const table = Array(2)
         .fill(0)
         .map(() => Array(pattern.length + 1).fill(0));

      // for every empty pattern we have one match
      table[0][0] = 1;
      table[1][0] = 1;

      for (let i = 1; i <= string.length; i++) {
         for (let j = 1; j <= pattern.length; j++) {
            // reset previous calculation since we just have two rows for an  entire string
            table[i % 2][j] = 0;
            if (string[i - 1] === pattern[j - 1]) {
               table[i % 2][j] = table[(i - 1) % 2][j - 1];
            }
            table[i % 2][j] += table[(i - 1) % 2][j];
         }
      }

      return table[string.length % 2][pattern.length];
   }
}

//
// TEST
//
console.log(countPatterns("tomorrow", "tor"));
console.log(countPatterns("baxmx", "ax"));
