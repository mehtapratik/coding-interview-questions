//
// INSTRUCTIONS
//
// Given a string, find the total number of palindromic substrings in it. Please note we need to find
// the total number of substrings and not subsequences.
//

//
// EXAMPLE
//
// Input: "abdbca"
// Output: 7
// Explanation: Here are the palindromic substrings, "a", "b", "d", "b", "c", "a", "bdb".
//
// Input: = "cddpd"
// Output: 7
// Explanation: Here are the palindromic substrings, "c", "d", "d", "p", "d", "dd", "dpd".
//
// Input: = "pqr"
// Output: 3
// Explanation: Here are the palindromic substrings,"p", "q", "r".
//

//
// CODE
//
function countPalindromes(input) {
   if (typeof input !== "string" || input.length === 0) {
      return 0;
   }

   const cache = {};

   // return recursive(0, input.length - 1);
   // return memoization(0, input.length - 1);
   return tabulation();

   // O(3^n)TS
   function recursive(startIndex, endIndex) {
      // negative base case -> `start` and `end` indicies are flipped
      if (startIndex > endIndex) {
         return 0;
      }

      // positive base case -> `start` and `end` indicies are same.
      // single character counts as its own palindrome
      if (startIndex === endIndex) {
         return 1;
      }

      return (
         // add one to the count if there is a palindrome between current `start` and `end` indicies
         // prettier-ignore
         isPalindrome(startIndex, endIndex) ? 1 : 0 +
         recursive(startIndex + 1, endIndex) +
         recursive(startIndex, endIndex - 1) -
         // we're adding middle palindromes (from `start+1` to `end-1`) count twice above, 
         // therefore reduce one
         recursive(startIndex + 1, endIndex - 1)
      );
   }

   // O(n^2)TS --> Actual: O([n-1]^2 + n)T
   function memoization(startIndex, endIndex) {
      const CACHE_KEY = `${startIndex},${endIndex}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      if (startIndex > endIndex) {
         cache[CACHE_KEY] = 0;
      } else if (startIndex === endIndex) {
         cache[CACHE_KEY] = 1;
      } else {
         // prettier-ignore
         cache[CACHE_KEY] = (
              isPalindrome(startIndex, endIndex) ? 1 : 0 +
              memoization(startIndex + 1, endIndex) +
              memoization(startIndex, endIndex - 1) -
              memoization(startIndex + 1, endIndex - 1)
         );
      }

      return cache[CACHE_KEY];
   }

   //O(N^2)TS
   function tabulation() {
      let count = 0;

      const table = Array(input.length)
         .fill(false)
         .map(() => Array(input.length).fill(false));

      // every character on its own is palindrome
      for (let i = 0; i < input.length; i++) {
         table[i][i] = true;
         count++;
      }

      for (let start = 0; start < input.length; start++) {
         for (let end = start - 1; end >= 0; end--) {
            // adjacent top/right cell will be true if inner string is palindrome
            const isInnerStringPalindrome = table[start - 1][end + 1];
            const isTwoCharString = start - end === 1;

            if (input[start] === input[end]) {
               if (isTwoCharString || isInnerStringPalindrome) {
                  table[start][end] = true;
                  count++;
               }
            }
         }
      }
      return count;
   }

   const isPalindrome = (from, to) => {
      while (from < to) {
         if (input[from++] !== input[to--]) {
            return false;
         }
      }
      return true;
   };
}

//
// TEST
//
console.log(countPalindromes("abcdg"));
console.log(countPalindromes("dcddpd"));
console.log(countPalindromes("abcdefg"));
console.log(countPalindromes("pqr"));
console.log(countPalindromes("nassan"));
console.log(countPalindromes("pqrs"));
console.log(countPalindromes("c4b2a1a3b5c"));
console.log(countPalindromes("abbbca"));
console.log(countPalindromes("abac"));
console.log(countPalindromes("aabcd"));
console.log(countPalindromes("acbbba"));
