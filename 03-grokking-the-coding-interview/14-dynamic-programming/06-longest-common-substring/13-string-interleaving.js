//
// INSTRUCTIONS
//
// Given three strings ‘m’, ‘n’, and ‘p’, write a method to find out if ‘p’ has been
// formed by interleaving ‘m’ and ‘n’. ‘p’ would be considered interleaving ‘m’ and
// ‘n’ if it contains all the letters from ‘m’ and ‘n’ and the order of letters is
// preserved too.
//

//
// EXAMPLE
//
// Input: m="abd", n="cef", p="abcdef"
// Output: true
// Explanation: 'p' contains all the letters from 'm' and 'n' and preserves their order too.
//
// Input: m="abd", n="cef", p="adcbef"
// Output: false
// Explanation: 'p' contains all the letters from 'm' and 'n' but does not preserve the order.
//
// Input: m="cc", n="ca", p="ccac"
// Output: true
// Explanation: 'p' contains all the letters from 'm' and 'n' and preserves their order too.
//

//
// CODE
//
function stringInterleaving(m, n, p) {
   if (
      typeof m !== "string" ||
      typeof n !== "string" ||
      typeof p !== "string" ||
      m.length + n.length !== p.length
   ) {
      return false;
   }

   const cache = {};
   // return recursive(0, 0, 0);
   // return memoization(0, 0, 0);
   return tabulation();

   // O(2^(m + n))TS
   function recursive(i, j, k) {
      if (k === p.length) {
         return i === m.length && j === n.length;
      }

      let includeM = false;
      let includeN = false;
      // in some cases, the character at current position of `p` may be available
      // in both `m` and `n` strings. In such case, choosing to increment one over
      // another may change the output dramatically.
      // e.g. m = cc, n = ca, p = ccac
      if (i < m.length && m[i] === p[k]) {
         includeM = recursive(i + 1, j, k + 1);
      }
      if (j < n.length && n[j] === p[k]) {
         includeN = recursive(i, j + 1, k + 1);
      }

      return includeM || includeN;
   }

   //O(m * n)TS
   function memoization(i, j, k) {
      const CACHE_KEY = `i${i}-j${j}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }

      cache[CACHE_KEY] = (() => {
         if (k === p.length) {
            return i === m.length && j === n.length;
         }

         let includeM = false;
         let includeN = false;
         // in some cases, the character at current position of `p` may be available
         // in both `m` and `n` strings. In such case, choosing to increment one over
         // another may change the output dramatically.
         // e.g. m = cc, n = ca, p = ccac
         if (i < m.length && m[i] === p[k]) {
            includeM = memoization(i + 1, j, k + 1);
         }
         if (j < n.length && n[j] === p[k]) {
            includeN = memoization(i, j + 1, k + 1);
         }

         return includeM || includeN;
      })();

      return cache[CACHE_KEY];
   }

   //O(m * n)TS
   function tabulation() {
      // make sure if lengths of the strings add up
      if (m.length + n.length !== p.length) {
         return false;
      }

      // we will be storing the result in such a way that
      // table[mIndex][nIndex] is the result of its their matches up to
      // p[mIndex + nIndex - 1] position.
      const table = Array(m.length + 1)
         .fill(false)
         .map(() => Array(n.length + 1).fill(false));

      for (let i = 0; i <= m.length; i++) {
         for (let j = 0; j <= n.length; j++) {
            if (i === 0 && j === 0) {
               // if 'm' and 'n' are empty, then 'p' must have been empty too.
               table[i][j] = true;
            } else if (i === 0 && n[j - 1] === p[j - 1]) {
               // if 'm' is empty, we need to check the interleaving with 'n' only
               table[i][j] = table[i][j - 1];
            } else if (j === 0 && m[i - 1] === p[i - 1]) {
               // if 'n' is empty, we need to check the interleaving with 'm' only
               table[i][j] = table[i - 1][i];
            } else {
               // if the letter of 'm' and 'p' match, we take whatever is matched till mIndex-1
               if (m[i - 1] === p[i + j - 1]) {
                  table[i][j] = table[i - 1][j];
               }

               // if the letter of 'n' and 'p' match, we take whatever is matched till
               // nIndex-1 too note the '||', this is required when we have common letters
               if (n[j - 1] === p[i + j - 1]) {
                  table[i][j] = table[i][j - 1] || table[i - 1][j];
               }
            }
         }
      }

      return table[m.length][n.length];
   }
}

//
// TEST
//
console.log(stringInterleaving("cc", "ca", "ccac"));
console.log(stringInterleaving("aabcc", "dbbca", "aadbbcbcac"));
console.log(stringInterleaving("abd", "cef", "abcdef"));
console.log(stringInterleaving("abd", "cef", "adcbef"));
console.log(stringInterleaving("abc", "def", "abdccf"));
console.log(stringInterleaving("abcdef", "mnop", "mnaobcdepf"));
console.log(stringInterleaving("", "", ""));
console.log(stringInterleaving("", "", "a"));
console.log(stringInterleaving("", "a", "a"));
console.log(stringInterleaving("", "a", ""));
console.log(stringInterleaving("aa", "aa", "aaaa"));
console.log(stringInterleaving("aa", "aa", "aaaaa"));
console.log(stringInterleaving("aa", "aa", "aaa"));
