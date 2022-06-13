/*
Given a string, find the length of the longest substring, which has all distinct characters.

Example 1:
Input: String="aabccbb"
Output: 3
Explanation: The longest substring with distinct characters is "abc".

Example 2:
Input: String="abbbb"
Output: 2
Explanation: The longest substring with distinct characters is "ab".

Example 3:
Input: String="abccde"
Output: 3
Explanation: Longest substrings with distinct characters are "abc" & "cde".
*/

// O(N+N)T ~ O(N)
// O(C)S where C is number of unique characters in longest substring
const non_repeat_substring = function (str) {
   let windowStart = 0;
   let longestSubstring = 0;

   const charFreq = {};
   for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
      const currentChar = str[windowEnd];
      if (!(currentChar in charFreq)) charFreq[currentChar] = 0;
      charFreq[currentChar]++;
      // console.log(`Current char ${currentChar} at ${windowEnd}`, charFreq);
      while (charFreq[currentChar] > 1) {
         const formerChar = str[windowStart];
         charFreq[formerChar]--;
         // not really necesary to delete zeroed down char from
         // charMap as we're not relying on charMap key length
         // to calculate longest string
         if (charFreq[formerChar] === 0) delete charFreq[formerChar];
         // console.log(`Former char ${formerChar} at ${windowStart}`, charFreq);
         windowStart++;
      }

      longestSubstring = Math.max(
         longestSubstring,
         windowEnd - windowStart + 1
      );
   }

   return longestSubstring;
};

console.log(non_repeat_substring("aacaea"));
