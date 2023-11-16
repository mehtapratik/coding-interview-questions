//
// INSTRUCTIONS
//
// Given two strings s1 and s2, return true if s2 contains a permutation of s1,
// or false otherwise.
//
// In other words, return true if one of s1's permutations is the substring of s2.
//

//
// EXAMPLES
//
// Example 1:
// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").
//
// Example 2:
// Input: s1 = "ab", s2 = "eidboaoo"
// Output: false
//

//
// CODE
//
function solve(pattern, text) {
   const charMap = new Map();
   for (let char of pattern) {
      charMap.set(char, (charMap.get(char) ?? 0) + 1);
   }

   let [start, end, matchCount] = [0, 0, 0];

   while (start < text.length) {
      // does pattern start from here?
      if (charMap.has(text[start])) {
         end = start;
         while (charMap.get(text[end]) > 0) {
            const char = text[end];
            charMap.set(char, charMap.get(char) - 1);
            if (charMap.get(char) === 0) {
               matchCount++;
            }
            end++;
         }
         if (matchCount === charMap.size) {
            return true;
         } else {
            for (let i = start; i < end; i++) {
               const char = text[i];
               if (charMap.has(char)) {
                  charMap.set(char, charMap.get(char) + 1);
                  if (charMap.get(char) === 1) {
                     matchCount--;
                  }
               }
            }
         }
      }
      start++;
   }

   return false;
}

//
// TEST
//
console.log(solve("ab", "eidboaoo"));
console.log(solve("hello", "00holleoooleh"));
