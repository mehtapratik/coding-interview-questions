//
// INSTRUCTIONS
//
// Given strings s1 and s2, we need to transform s1 into s2 by deleting and inserting characters.
// Write a function to calculate the count of the minimum number of deletion and insertion operations.
//

//
// EXAMPLE
//
// Input: s1 = "abc"
//        s2 = "fbc"
// Output: 1 deletion and 1 insertion.
// Explanation: We need to delete {'a'} and insert {'f'} to s1 to transform it into s2.
//
// Input: s1 = "abdca"
//        s2 = "cbda"
// Output: 2 deletions and 1 insertion.
// Explanation: We need to delete {'a', 'c'} and insert {'c'} to s1 to transform it into s2.
//
// Input: s1 = "passport"
//        s2 = "ppsspt"
// Output: 3 deletions and 1 insertion
// Explanation: We need to delete {'a', 'o', 'r'} and insert {'p'} to s1 to transform it into s2.
//

//
// EXPLANATION
//
// This problem can easily be converted to the Longest Common Subsequence (LCS). If we can find
// the LCS of the two input strings, we can easily find how many characters we need to insert
// or delete from s1 and s2.
//
// 1. Let’s assume len1 is the length of s1 and len2 is the length of s2.
// 2. Now let’s assume c1 is the length of LCS of the two strings s1 and s2.
// 3. To transform s1 into s2, we need to delete everything from s1 which is not part of LCS,
//    so minimum deletions we need to perform from s1 => len1 - c1
// 4. Similarly, we need to insert everything in s1 which is present in s2 but not part of
//    LCS, so minimum insertions we need to perform in s1 => len2 - c1
//

//
// CODE
//
function minInsAndDelCount(string1, string2) {
   const cache = {};
   // const lcs = recursive(0, 0);
   // const lcs = memoization(0, 0);
   // const lcs = tabulation();
   const lcs = tabulationCompressed();

   return {
      insert:
         string1.length >= string2.length
            ? string1.length - lcs + " chars of string1 into string2"
            : string2.length - lcs + " chars of string2 into string1",
      delete:
         string1.length >= string2.length
            ? string2.length - lcs + " chars from string2"
            : string1.length - lcs + " chars from string1",
   };

   // O(2^(n+m))T | O(n+m)S
   function recursive(i, j) {
      if (i >= string1.length || j >= string2.length) {
         return 0;
      }

      if (string1[i] === string2[j]) {
         return 1 + recursive(i + 1, j + 1);
      }

      const iCount = recursive(i + 1, j, 0);
      const jCount = recursive(i, j + 1, 0);
      return Math.max(iCount, jCount);
   }

   // O(n * m)TS
   function memoization(i, j) {
      const CACHE_KEY = `${i},${j}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      cache[CACHE_KEY] = (() => {
         if (i >= string1.length || j >= string2.length) {
            return 0;
         }

         if (string1[i] === string2[j]) {
            return 1 + memoization(i + 1, j + 1);
         }

         const iCount = memoization(i + 1, j);
         const jCount = memoization(i, j + 1);

         return Math.max(iCount, jCount);
      })();

      return cache[CACHE_KEY];
   }

   // O(n * m)TS
   function tabulation() {
      const table = Array(string1.length + 1)
         .fill(0)
         .map(() => Array(string2.length + 1).fill(0));

      for (let i = 1; i <= string1.length; i++) {
         for (let j = 1; j <= string2.length; j++) {
            if (string1[i - 1] === string2[j - 1]) {
               table[i][j] = 1 + table[i - 1][j - 1];
            } else {
               table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
            }
         }
      }

      return table[string1.length][string2.length];
   }

   // O(n * m)T | O(min(n, m))S
   function tabulationCompressed() {
      const longer = string1.length >= string2.length ? string1 : string2;
      const shorter = string1.length >= string2.length ? string2 : string1;

      const table = Array(2)
         .fill(0)
         .map(() => Array(shorter.length + 1).fill(0));

      for (let i = 1; i <= longer.length; i++) {
         for (let j = 1; j <= shorter.length; j++) {
            const [prevRow, currRow] = [(i - 1) % 2, i % 2];
            const [prevCol, currCol] = [j - 1, j];
            const prevMatchCount = table[prevRow][prevCol];
            const countBefore = table[currRow][prevCol];
            const countAfter = table[prevRow][currCol];
            if (longer[i - 1] === shorter[j - 1]) {
               table[currRow][currCol] = 1 + prevMatchCount;
            } else {
               table[currRow][currCol] = Math.max(countBefore, countAfter);
            }
         }
      }

      return table[longer.length % 2][shorter.length];
   }

   // TODO: Rewrite above implementation to show actual character deleted/inserted
   // and the common string you end up with upon doing so
}

//
// TEST
//
console.log(minInsAndDelCount("abc", "fbc"));
console.log(minInsAndDelCount("abdca", "cbda"));
console.log(minInsAndDelCount("passport", "ppsspt"));
