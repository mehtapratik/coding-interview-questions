//
// INSTRUCTIONS
//
// Given two strings s and t of lengths m and n respectively, return the minimum window
// substring of s such that every character in t (including duplicates) is included in
// the window. If there is no such substring, return the empty string "".
//
// The testcases will be generated such that the answer is unique.
//

//
// EXAMPLES
//
// Example 1:
// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
//
// Example 2:
// Input: s = "a", t = "a"
// Output: "a"
// Explanation: The entire string s is the minimum window.
//
// Example 3:
// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.
//

//
// CODE
//
function solve(text, pattern) {
   if (pattern.length > text.length) {
      return "";
   }

   // Step 1 -> Build pattern map
   const patternMap = new Map();
   for (let char of pattern) {
      const charCount = (patternMap.get(char) ?? 0) + 1;
      patternMap.set(char, charCount);
   }

   let [start, end, uniqueCharMatched] = [0, 0, 0];
   let [shortestLen, shortestStart] = [Infinity, -1];

   // Step 2 -> identify a window within a string where all characters of patterns are included
   while (end < text.length) {
      const currentChar = text[end];
      if (patternMap.has(currentChar)) {
         const newCount = patternMap.get(currentChar) - 1;
         patternMap.set(currentChar, newCount);
         // all instances of currentChar are now part of curreng substring window between `start` and `end`
         if (newCount === 0) {
            uniqueCharMatched += 1;
         }
      }

      // Entire pattern is part of `start` to `end` window
      if (uniqueCharMatched === patternMap.size) {
         // keep shrinking window up while we have a window with all characters in pattern
         while (start <= end && uniqueCharMatched === patternMap.size) {
            const formerChar = text[start];
            start++;
            if (patternMap.has(formerChar)) {
               const newCount = patternMap.get(formerChar) + 1;
               patternMap.set(formerChar, newCount);

               // when this happens, we looped one char ahead from where pattern begins.
               // reduce the counter to immediately exit the loop.
               if (newCount === 1) {
                  uniqueCharMatched -= 1;
               }
            }
         }

         const currentLength = end - start + 1;
         if (shortestLen > currentLength) {
            // At this stage `start` is pointing one character ahead from where window begins
            shortestStart = start - 1;
            shortestLen = currentLength;
         }
      }
      end++;
   }

   if (shortestLen === Infinity) {
      return "";
   }

   return text.substring(shortestStart, shortestStart + shortestLen + 1);
}

//
// TEST
//
// c a b w e f g e w c w a e f g c f
console.log(solve("cabwefgewcwaefgcf", "cae"));
console.log(solve("CDADOBECODEBANC", "ABC"));
console.log(solve("A", "B"));
console.log(solve("A", "A"));
console.log(solve("aa", "aa"));
console.log(solve("ab", "a"));
console.log(solve("ba", "a"));
