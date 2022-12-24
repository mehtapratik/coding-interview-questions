//
// INSTRUCTIONS
//
// Given a sequence, find the length of its Longest Palindromic Subsequence (LPS). In a palindromic
// subsequence, elements read the same backward and forward.
//
// A subsequence is a sequence that can be derived from another sequence by deleting
// some or no elements without changing the order of the remaining elements.
//

//
// EXAMPLE
//
// Input: "abdbca"
// Output: 5
// Explanation: LPS is "abdba".
//
// Input: = "cddpd"
// Output: 3
// Explanation: LPS is "ddd".
//
// Input: = "pqr"
// Output: 1
// Explanation: LPS could be "p", "q" or "r".
//

//
// CODE
//
function longestPalindromeLength(sequence) {
   if (typeof sequence !== "string" || sequence.length === 0) {
      return 0;
   }

   const cache = {};
   // return recursive(0, sequence.length - 1);
   // return memoization(0, sequence.length - 1);
   // return tabulation();
   return tabulation_alternate_implementation();

   // O(2^N)T | O(N)S
   function recursive(startIndex, endIndex) {
      // we've reached end start and end indices have moved other way
      if (startIndex > endIndex) {
         return 0;
      }

      // It's palindrome of length 1 if start and end indicies are same (1 character)
      if (startIndex === endIndex) {
         return 1;
      }

      // Option 1: see if character of on both ends are same, if yes, move further down to find
      // longest possible subsequence
      if (sequence[startIndex] === sequence[endIndex]) {
         return 2 + recursive(startIndex + 1, endIndex - 1);
      }

      // Option 2: if both character are not same, try identifying longest substring
      // by 1) moving 1 character from left and 2) moving one character from right
      const longestFromRight = recursive(startIndex + 1, endIndex);
      const longestFromLeft = recursive(startIndex, endIndex - 1);

      // NOTE: We do not have implementation like this...
      //       return Math.max(option1Length, option2LeftLength, option2RightLength)
      // because once you find same character at given start/end position (option 1),
      // you are bound to find longest possible subsequence from that point. In other
      // words, you will never find shorter palindrome outside than all other
      // palindromes you can find inside.
      return Math.max(longestFromRight, longestFromLeft);
   }

   // O(N^2)T - In worst case, string will not be palindrome (e.g. abcdefgh). This will
   // result in 2 sets of recursion calls, one for startIndex + 1 and another for
   // endIndex - 1. This will happen for each character until start and endIndex
   // are same. This will yield to n^2 executions.
   // O(n^2)S - Actual O(n + n^2) - Cache will store total of n^2 keys for each permutation
   // and O(n) for callstack. This simplifies to O(n^2).
   function memoization(startIndex, endIndex) {
      const CACHE_KEY = `${startIndex},${endIndex}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      if (startIndex > endIndex) {
         return 0;
      }

      if (startIndex === endIndex) {
         return 1;
      }

      if (sequence[startIndex] === sequence[endIndex]) {
         cache[CACHE_KEY] = 2 + memoization(startIndex + 1, endIndex - 1);
      } else {
         const longestFromRight = memoization(startIndex + 1, endIndex);
         const longestFromLeft = memoization(startIndex, endIndex - 1);
         cache[CACHE_KEY] = Math.max(longestFromLeft, longestFromRight);
      }

      return cache[CACHE_KEY];
   }

   //O(n^2)TS
   function tabulation() {
      let table = Array(sequence.length)
         .fill(0)
         .map(() => Array(sequence.length).fill(0));

      for (let i = 0; i < sequence.length; i++) {
         table[i][i] = 1;
      }

      for (let start = sequence.length - 1; start >= 0; start--) {
         for (let end = start + 1; end < sequence.length; end++) {
            if (sequence[start] === sequence[end]) {
               table[start][end] = 2 + table[start + 1][end - 1];
            } else {
               table[start][end] = Math.max(
                  table[start + 1][end],
                  table[start][end - 1]
               );
            }
         }
      }

      return table[0][sequence.length - 1];
   }

   // O(n^2)TS
   function tabulation_alternate_implementation() {
      let table = Array(sequence.length)
         .fill(0)
         .map(() => Array(sequence.length).fill(0));

      for (let i = 0; i < sequence.length; i++) {
         table[i][i] = 1;
      }

      for (let start = 0; start < sequence.length; start++) {
         for (let end = start - 1; end >= 0; end--) {
            if (sequence[start] === sequence[end]) {
               table[start][end] = 2 + table[start - 1][end + 1];
            } else {
               table[start][end] = Math.max(
                  table[start - 1][end],
                  table[start][end + 1]
               );
            }
         }
      }
      return table[sequence.length - 1][0];
   }

   //TODO: Identify how to decode tabulation to show generated palindrome from original string
}

//
// TEST
//
console.log(longestPalindromeLength("cdeafa")); // abdba
console.log(longestPalindromeLength("cddpd"));
console.log(longestPalindromeLength("pqrs"));
console.log(longestPalindromeLength(""));
