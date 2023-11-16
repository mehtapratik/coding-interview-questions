//
// INSTRUCTIONS
//
// Given a string s, find the length of the longest substring
// without repeating characters.
//

//
// EXAMPLES
//
// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
//
// Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
//
// Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
//

//
// CODE
//
function longestSubstrLen(str) {
   let [start, end, longestLen] = [0, 0, 0];
   const hash = new Set();

   while (end < str.length) {
      const currentChar = str[end];
      while (hash.has(currentChar) > 0) {
         const formerChar = str[start];
         hash.delete(formerChar);
         start++;
      }
      hash.add(currentChar);

      longestLen = Math.max(longestLen, end - start + 1);
      end++;
   }

   return longestLen;
}

//
// TEST
//
console.log(longestSubstrLen("abcabcbb"));
console.log(longestSubstrLen("bbbbbb"));
console.log(longestSubstrLen("pwwkew"));
