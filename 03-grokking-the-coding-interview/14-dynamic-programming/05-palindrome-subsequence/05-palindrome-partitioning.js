//
// INSTRUCTIONS
//
// Given a string, we want to cut it into pieces such that each piece is a palindrome.
// Write a function to return the minimum number of cuts needed.
//

//
// EXAMPLE
//
// Input: "abdbca"
// Output: 3
// Explanation: Palindrome pieces are "a", "bdb", "c", "a".
//
// Input: = "cddpd"
// Output: 2
// Explanation: Palindrome pieces are "c", "d", "dpd".
//
// Input: = "pqr"
// Output: 2
// Explanation: Palindrome pieces are "p", "q", "r".
//
// Input: = "pp"
// Output: 0
// Explanation: We do not need to cut, as "pp" is a palindrome.
//

//
// CODE
//
function palindromicPartioning(str) {
   if (typeof str !== "string" || str.length === 0) {
      return 0;
   }
   const cache = {};
   const palindromCache = {};
   const isPalindrome = (from, to) => {
      const CACHE_KEY = `${from}, ${to}`;

      if (CACHE_KEY in palindromCache) {
         return palindromCache[CACHE_KEY];
      }

      palindromCache[CACHE_KEY] = true;
      while (from <= to) {
         if (str[from++] !== str[to--]) {
            palindromCache[CACHE_KEY] = false;
            break;
         }

         const INNER_CACHE_KEY = `${from}, ${to}`;
         if (from < to && INNER_CACHE_KEY in palindromCache) {
            palindromCache[CACHE_KEY] = palindromCache[INNER_CACHE_KEY];
            break;
         }
      }

      return palindromCache[CACHE_KEY];
   };

   return memoization(0, str.length - 1);

   // O(2^n)T | O(n)S
   function recursive(startIndex, endIndex) {
      // if `start` and `end` are
      // 1) on flip side OR
      // 2) on the same character
      // OR
      // 3) entire string between `start` and `end` character is palindrome,
      // then there is no need for any partitioning
      if (startIndex >= endIndex || isPalindrome(startIndex, endIndex)) {
         return 0;
      }

      // at max, we need to cut the string into its 'length-1' pieces
      let minPartitions = endIndex - startIndex;
      // determine if any portion of your string is palindrome
      // if so, add one partition to split from there. keep doing so
      // until you find minimum number of partitions
      for (let i = startIndex; i <= endIndex; i++) {
         if (isPalindrome(startIndex, i)) {
            minPartitions = Math.min(
               minPartitions,
               1 + recursive(i + 1, endIndex)
            );
         }
      }

      return minPartitions;
   }

   // O(n^2 * n)T -> we are calculating the results for any substring only once.
   // We know that a string size n has n^2 possible substrings. Additionally, within
   // each recursive call, we are also checking if a substring is palindrome or not.
   // O(n^2)S -> we are using two 2-dimensional arrays (n^2 + n^2) `cache`
   // and `palindromeCache`
   function memoization(startIndex, endIndex) {
      const CACHE_KEY = `${startIndex}, ${endIndex}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      if (startIndex >= endIndex || isPalindrome(startIndex, endIndex)) {
         cache[CACHE_KEY] = 0;
      } else {
         let minPartitions = endIndex - startIndex;

         for (let i = startIndex; i <= endIndex; i++) {
            if (isPalindrome(startIndex, i)) {
               minPartitions = Math.min(
                  minPartitions,
                  1 + memoization(i + 1, endIndex)
               );
            }
         }

         cache[CACHE_KEY] = minPartitions;
      }

      return cache[CACHE_KEY];
   }
}

//
// TEST
//
console.log(palindromicPartioning("abcdg")); // 4
console.log(palindromicPartioning("dcddpd")); // 1
console.log(palindromicPartioning("abcdefg")); // 6
console.log(palindromicPartioning("pqr")); // 2
console.log(palindromicPartioning("nassan")); // 0
console.log(palindromicPartioning("c4b2a1a3b5c"));
console.log(palindromicPartioning("abbbca"));
console.log(palindromicPartioning("abac"));
console.log(palindromicPartioning("aabcd"));
console.log(palindromicPartioning("acbbba"));
