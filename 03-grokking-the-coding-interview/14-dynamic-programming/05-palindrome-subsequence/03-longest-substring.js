//
// INSTRUCTIONS
//
// Given a string, find the length of its Longest Palindromic Substring (LPS). In a palindromic
// string, elements read the same backward and forward.
//

//
// EXAMPLE
//
// Input: "abdbca"
// Output: 3
// Explanation: LPS is "bdb".
//
// Input: = "cddpd"
// Output: 3
// Explanation: LPS is "dpd".
//
// Input: = "pqr"
// Output: 1
// Explanation: LPS could be "p", "q" or "r".
//

//
// CODE
//
function longestPalindromicLength(input) {
   if (typeof input !== "string" || input.length === 0) {
      return 0;
   }

   const cache = {};
   // return recursive(0, input.length - 1);
   return memoization(0, input.length - 1);

   // O(3^n)T | O(n)S
   // worst case being 'c4b2a1a3b5c' - we're alternating beween same character between both end and
   // then not same character between both end requiring all three loops to be executed for all cases
   function recursive(startIndex, endIndex) {
      if (startIndex > endIndex) {
         return 0;
      }
      if (startIndex === endIndex) {
         return 1;
      }

      if (input[startIndex] === input[endIndex]) {
         const remainingLength = endIndex - startIndex - 1;
         const substringLength = recursive(startIndex + 1, endIndex - 1);
         if (remainingLength === substringLength) {
            return substringLength + 2;
         }

         // OR - time and space complexity will still be same
         // if (isPalindrome(input.substring(startIndex, endIndex + 1))) {
         //    return endIndex - startIndex + 1;
         // }
      }

      const palindromeLengthFromRight = recursive(startIndex + 1, endIndex);
      const palindromLengthFromLeft = recursive(startIndex, endIndex - 1);

      return Math.max(palindromLengthFromLeft, palindromeLengthFromRight);
   }

   // O(n^2)TS
   function memoization(startIndex, endIndex) {
      const CACHE_KEY = `${startIndex}, ${endIndex}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      if (startIndex > endIndex) {
         return 0;
      }

      if (startIndex === endIndex) {
         return 1;
      }

      if (input[startIndex] === input[endIndex]) {
         const remainingStringLength = endIndex - startIndex - 1;
         const innerPalindromeLength = memoization(
            startIndex + 1,
            endIndex - 1
         );
         // inner string's palindrom length must be same as remanining string length
         // otherwise we did not find palindrome becuase inner string is not complete palindrome
         if (innerPalindromeLength === remainingStringLength) {
            cache[CACHE_KEY] = innerPalindromeLength + 2;
            return cache[CACHE_KEY];
         }
      }
      const lenFromLeft = memoization(startIndex + 1, endIndex);
      const lenFromRight = memoization(startIndex, endIndex - 1);
      cache[CACHE_KEY] = Math.max(lenFromLeft, lenFromRight);

      return cache[CACHE_KEY];
   }

   function isPalindrome(input) {
      let startIndex = 0;
      let endIndex = input.length - 1;
      while (startIndex <= endIndex) {
         if (input[startIndex] !== input[endIndex]) return false;
         else {
            startIndex++;
            endIndex--;
         }
      }

      return true;
   }
}

//
// TEST
//
console.log(longestPalindromicLength("abdbca"));
console.log(longestPalindromicLength("nassan"));
console.log(longestPalindromicLength("pqrs"));
console.log(longestPalindromicLength("c4b2a1a3b5c"));
