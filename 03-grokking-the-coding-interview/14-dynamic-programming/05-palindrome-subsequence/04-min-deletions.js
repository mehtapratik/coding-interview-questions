//
// INSTRUCTIONS
//
// Given a string, find the minimum number of characters that we can remove to make it a palindrome.
//

//
// EXAMPLE
//
// Input: "abdbca"
// Output: 1
// Explanation: By removing "c", we get a palindrome "abdba".
//
// Input: = "cddpd"
// Output: 2
// Explanation: Deleting "cp", we get a palindrome "ddd".
//
// Input: = "pqr"
// Output: 2
// Explanation: We have to remove any two characters to get a palindrome, e.g. if we
// remove "pq", we get palindrome "r".
//

//
// CODE
//
function minDeletions(str) {
   const cache = {};
   // return recursive(0, str.length - 1);
   // return memoization(0, str.length - 1);
   return tabulation();

   // O(2^n)T | O(n)S
   function recursive(startIndex, endIndex) {
      // base cases --> no need to remove any chars since either
      // 1) we're either at the same character indicies or
      // 2) `start` and `end` indicies are flipped.
      if (startIndex >= endIndex) {
         return 0;
      }

      // no need to remove any chars since they are same at both ends.
      // find out how many characters needs to be removed from inside.
      if (str[startIndex] === str[endIndex]) {
         return recursive(startIndex + 1, endIndex - 1);
      }

      // since both chars are not same we know that at least one char needs to be deleted.
      // add minimum deletion count that we get either by moving one char from left or right.
      return (
         1 +
         Math.min(
            recursive(startIndex + 1, endIndex),
            recursive(startIndex, endIndex - 1)
         )
      );
   }

   // O(n^2)TS
   function memoization(startIndex, endIndex) {
      const CACHE_KEY = `${startIndex}, ${endIndex}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      // base cases --> no need to remove any chars since either
      // 1) we're either at the same character indicies or
      // 2) `start` and `end` indicies are flipped.
      if (startIndex >= endIndex) {
         cache[CACHE_KEY] = 0;
      }
      // no need to remove any chars since they are same at both ends.
      // find out how many characters needs to be removed from inside.
      else if (str[startIndex] === str[endIndex]) {
         cache[CACHE_KEY] = memoization(startIndex + 1, endIndex - 1);
      }
      // since both chars are not same we know that at least one char needs to be deleted.
      // add minimum deletion count that we get either by moving one char from left or right.
      else {
         cache[CACHE_KEY] =
            1 +
            Math.min(
               memoization(startIndex + 1, endIndex),
               memoization(startIndex, endIndex - 1)
            );
      }

      return cache[CACHE_KEY];
   }

   // O(n^2)TS
   function tabulation() {
      const table = Array(str.length)
         .fill(0)
         .map(() => Array(str.length).fill(0));

      for (let start = 0; start < str.length; start++) {
         for (let end = start - 1; end >= 0; end--) {
            // when characters on both side are same, adjacent top/right cell
            // of the matrix will hold the count of chars that needs to be
            // removed from inner string
            const innerStringDelCount = table[start - 1][end + 1];
            const leftSideDelCount = table[start - 1][end];
            const rightSideDelCount = table[start][end + 1];
            if (str[start] === str[end]) {
               table[start][end] = innerStringDelCount;
            } else {
               table[start][end] =
                  1 + Math.min(leftSideDelCount, rightSideDelCount);
            }
         }
      }

      return table[str.length - 1][0];
   }
}

//
// TEST
//
console.log(minDeletions("dcddpd")); // 2
console.log(minDeletions("abcdefg")); // 6
console.log(minDeletions("abbbca")); // 1
console.log(minDeletions("pqr")); // 2
console.log(minDeletions("ab2ba")); // 0
console.log(minDeletions("2a1a3")); // 4
console.log(minDeletions("abac")); // 1
console.log(minDeletions("adabcd")); // 3
console.log(minDeletions("acbbba")); // 1

//
// SIMILAR PROBLEMS
//
// 1. Minimum insertions in a string to make it a palindrome
//    Will the above approach work if we make insertions instead of deletions?
//    Yes, the length of the Longest Palindromic Subsequence is the best palindromic
//    subsequence we can have.Let’s take a few examples:
//
//     Input: "abdbca"
//     Output: 1
//     Explanation: By inserting “c”, we get a palindrome “acbdbca”.
//
//     Input: = "cddpd"
//     Output: 2
//     Explanation: Inserting “cp”, we get a palindrome “cdpdpdc”. We can also get a palindrome by inserting “dc”: “cddpddc”
//
//     Input: = "pqr"
//     Output: 2
//     Explanation: We have to insert any two characters to get a palindrome (e.g. if we insert “pq”, we get a palindrome “pqrqp”).
//
// 2.  Find if a string is K-Palindromic
//     Any string will be called K-palindromic if it can be transformed into a palindrome
//     by removing at most ‘K’ characters from it.
//
//     This problem can easily be converted to our base problem of finding the minimum deletions in a
//     string to make it a palindrome. If the “minimum deletion count” is not more than ‘K’, the string
//     will be K - Palindromic.
//
