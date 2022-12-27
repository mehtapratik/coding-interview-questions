//
// INSTRUCTIONS
//
// Given two strings ‘s1’ and ‘s2’, find the length of the longest substring which is common in both the strings.
//

//
// EXAMPLE
//
// Input: s1 = "abdca"
//        s2 = "cbda"
// Output: 2
// Explanation: The longest common substring is "bd".
//
// Input: s1 = "passport"
//        s2 = "ppsspt"
// Output: 3
// Explanation: The longest common substring is "ssp".
//

//
// CODE
//
function longestCommonSubstring(string1, string2) {
   // validate parameters
   if (typeof string1 !== "string" || typeof string2 !== "string") {
      return 0;
   }

   const cache = {};
   // return recursive(0, 0, []).join("");
   // return memoization(0, 0, []).join("");
   // return tabulation();
   return tabulationCompressed();

   // (2^(n+m))T | O(n+m)S
   function recursive(index1, index2, commonSubstring) {
      // base case -> cannot match any further if there are no more character left
      // in either of the strings
      if (index1 >= string1.length || index2 >= string2.length) {
         return commonSubstring;
      }

      // if char at both indicies match, go further down dfs chain to identify
      // its longest length
      if (string1[index1] === string2[index2]) {
         commonSubstring.push(string1[index1]);
         return recursive(index1 + 1, index2 + 1, commonSubstring);
      }
      // otherwise, start identifying new common substrings by moving one char
      // either from string1 or string2
      const commonSubstring1 = recursive(index1 + 1, index2, []);
      const commonSubstring2 = recursive(index1, index2 + 1, []);

      // compare all three common substrings and return longest
      // 1) common substring identified so far and passed down the dfs chain
      // 2) common substring identified by moving one char from string1
      // 3) common substring identified by moving one char from string2
      if (
         commonSubstring.length >= commonSubstring1.length &&
         commonSubstring.length >= commonSubstring2.length
      ) {
         return commonSubstring;
      } else if (commonSubstring1.length >= commonSubstring2.length) {
         return commonSubstring1;
      } else {
         return commonSubstring2;
      }
   }

   // O(n * m * max(n, m))TS
   function memoization(index1, index2, commonSubstring) {
      const KEY = `${index1},${index2},${commonSubstring.length}`;
      if (KEY in cache) {
         return cache[KEY];
      }

      cache[KEY] = (() => {
         // base case -> cannot match any further if there are no more character left
         // in either of the strings
         if (index1 >= string1.length || index2 >= string2.length) {
            return commonSubstring;
         }

         // if char at both indicies match, go further down dfs chain to identify
         // its longest length
         if (string1[index1] === string2[index2]) {
            commonSubstring.push(string1[index1]);
            return memoization(index1 + 1, index2 + 1, commonSubstring);
         } else {
            // otherwise, start identifying new common substrings by moving one char
            // either from string1 or string2
            const commonSubstring1 = memoization(index1 + 1, index2, []);
            const commonSubstring2 = memoization(index1, index2 + 1, []);

            // compare all three common substrings and return longest
            // 1) common substring identified so far and passed down the dfs chain
            // 2) common substring identified by moving one char from string1
            // 3) common substring identified by moving one char from string2
            if (
               commonSubstring.length >= commonSubstring1.length &&
               commonSubstring.length >= commonSubstring2.length
            ) {
               return commonSubstring;
            } else if (commonSubstring1.length >= commonSubstring2.length) {
               return commonSubstring1;
            } else {
               return commonSubstring2;
            }
         }
      })();

      return cache[KEY];
   }

   //O(n * m)TS
   function tabulation() {
      const table = Array(string1.length + 1)
         .fill(0)
         .map(() => Array(string2.length + 1).fill(0));

      let substringLength = 0;
      let startIndex = -1;
      let endIndex = -1;
      for (let i = 1; i <= string1.length; i++) {
         for (let j = 1; j <= string2.length; j++) {
            if (string1[i - 1] === string2[j - 1]) {
               table[i][j] = 1 + table[i - 1][j - 1];
               if (table[i][j] > substringLength) {
                  substringLength = table[i][j];
                  startIndex = i - substringLength;
                  endIndex = i;
               }
            }
         }
      }

      return startIndex >= 0 ? string1.substring(startIndex, endIndex) : "";
   }

   // O(n * m)T | O(m)S
   function tabulationCompressed() {
      const table = Array(2)
         .fill(0)
         .map(() => Array(string2.length + 1).fill(0));

      let substringLength = 0;
      let startIndex = -1;
      let endIndex = -1;
      for (let i = 1; i <= string1.length; i++) {
         for (let j = 1; j <= string2.length; j++) {
            // ensure that current char count is reset to zero since former `i`th
            // iterations might have set current `j` value to something other than 0.
            table[i % 2][j] = 0;
            let currentCount = 0;
            const previousCount = table[(i - 1) % 2][j - 1];
            if (string1[i - 1] === string2[j - 1]) {
               currentCount = 1 + previousCount;
               table[i % 2][j] = currentCount;
               if (currentCount > substringLength) {
                  substringLength = currentCount;
                  startIndex = i - substringLength;
                  endIndex = i;
               }
            }
         }
      }

      return startIndex >= 0 ? string1.substring(startIndex, endIndex) : "";
   }
}

//
// TEST
//
console.log(longestCommonSubstring("abbc", "abdc"));
console.log(longestCommonSubstring("abdca", "cbda"));
console.log(longestCommonSubstring("passport", "ppsspt"));
