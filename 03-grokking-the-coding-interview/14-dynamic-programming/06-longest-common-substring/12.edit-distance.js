//
// INSTRUCTIONS
//
// Given strings target and source, we need to transform target into source by deleting,
// inserting, or replacing characters. Write a function to calculate the
// count of the minimum number of edit operations.
//

//
// EXAMPLE
//
// Input: s1 = "bat"
//        s2 = "but"
// Output: 1
// Explanation: We just need to replace 'a' with 'u' to transform s1 to s2.
//
// Input: s1 = "abdca"
//        s2 = "cbda"
// Output: 2
// Explanation: We can replace first 'a' with 'c' and delete second 'c'.
//
// Input: s1 = "passpot"
//        s2 = "ppsspqrt"
// Output: 3
// Explanation: Replace 'a' with 'p', 'o' with 'q', and insert 'r'.
//

//
// CODE
//
function editDistance(target, source) {
   if (typeof target !== "string" || typeof source !== "string") {
      return -1;
   }
   const cache = {};
   // return recursive(0, 0);
   // return memoization(0, 0);
   // return tabulation();
   return tabulationCompressed();

   // O(3^(m+n))T | O(m+n)S
   function recursive(i, j) {
      // we reached end of the target string, if there are any characters left
      // in source string, they need to be inserted
      if (i === target.length) {
         return source.length - j;
      }

      // we reached end of the source string, if there are any characters left
      // in target string, they need to be deleted
      if (j === source.length) {
         return target.length - i;
      }

      // chars are current position match. continue matching further chars
      if (target[i] === source[j]) {
         return recursive(i + 1, j + 1);
      }

      const countIfInserted = 1 + recursive(i, j + 1);
      const countIfDeleted = 1 + recursive(i + 1, j);
      const countIfReplaced = 1 + recursive(i + 1, j + 1);

      return Math.min(countIfInserted, countIfDeleted, countIfReplaced);
   }

   // O(n * m)TS
   // O((n * m) + (n + m))S ~ O(n * m)S
   function memoization(i, j) {
      const CACHE_KEY = `{i${i}-j${j}}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      cache[CACHE_KEY] = (() => {
         // we reached end of the target string, if there are any characters left
         // in source string, they need to be inserted
         if (i === target.length) {
            return source.length - j;
         }

         // we reached end of the source string, if there are any characters left
         // in target string, they need to be deleted
         if (j === source.length) {
            return target.length - i;
         }

         // chars are current position match. continue matching further chars
         if (target[i] === source[j]) {
            return memoization(i + 1, j + 1);
         }

         const countIfInserted = 1 + memoization(i, j + 1);
         const countIfDeleted = 1 + memoization(i + 1, j);
         const countIfReplaced = 1 + memoization(i + 1, j + 1);

         return Math.min(countIfInserted, countIfDeleted, countIfReplaced);
      })();

      return cache[CACHE_KEY];
   }

   // O(n * m)TS
   function tabulation() {
      const table = Array(target.length + 1)
         .fill(0)
         .map(() => Array(source.length + 1).fill(0));

      // if source is empty, we can remove all the characters from target
      // to make it empty too
      for (let i = 0; i <= target.length; i++) {
         table[i][0] = i;
      }

      // if target is empty, we have to insert all the characters of source
      for (let j = 0; j <= source.length; j++) {
         table[0][j] = j;
      }

      for (let i = 1; i <= target.length; i++) {
         for (let j = 1; j <= source.length; j++) {
            if (target[i - 1] === source[j - 1]) {
               table[i][j] = table[i - 1][j - 1];
            } else {
               table[i][j] =
                  1 +
                  Math.min(
                     table[i - 1][j],
                     table[i - 1][j - 1],
                     table[i][j - 1]
                  );
            }
         }
      }

      return table[target.length][source.length];
   }

   // O(n * m)T | O(min(n, m))S
   function tabulationCompressed() {
      const shorter = target.length > source.length ? source : target;
      const longer = target.length > source.length ? target : source;
      const table = Array(2)
         .fill(0)
         .map(() => Array(shorter + 1).fill(0));

      // if longer string is empty, we have to delete/insert all the characters of shorter string
      for (let j = 0; j <= shorter.length; j++) {
         table[0][j] = j;
      }

      for (let i = 1; i <= longer.length; i++) {
         table[i % 2][0] = i;
         for (let j = 1; j <= shorter.length; j++) {
            if (longer[i - 1] === shorter[j - 1]) {
               table[i % 2][j] = table[(i - 1) % 2][j - 1];
            } else {
               table[i % 2][j] =
                  1 +
                  Math.min(
                     table[(i - 1) % 2][j],
                     table[(i - 1) % 2][j - 1],
                     table[i % 2][j - 1]
                  );
            }
         }
      }

      return table[longer.length % 2][shorter.length];
   }
}

//
// TEST
//
console.log(editDistance("but", "bat"));
console.log(editDistance("abdca", "cbda"));
console.log(editDistance("passpot", "ppsspqrt"));
