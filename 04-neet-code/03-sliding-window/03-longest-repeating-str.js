//
// INSTRUCTIONS
//
// You are given a string s and an integer k. You can choose any character of the string
// and change it to any other uppercase English character.You can perform this operation
// at most k times.
//
// Return the length of the longest substring containing the same letter you can get
// after performing the above operations.
//

//
// EXAMPLES
//
// Example 1:
// Input: s = "ABBA", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.
//
// Example 2:
// Input: s = "CDAABA", k = 1
// Output: 4
// Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
// The substring "BBBB" has the longest repeating letters, which is 4.
// There may exists other ways to achieve this answer too.
//

//
// CODE
//
function solution(text, count) {
   let [start, end, maxlen, maxRepeats] = [0, 0, 0, 0];
   const charMap = new Map();

   while (end < text.length) {
      const currentChar = text[end];
      const currentCharCount = (charMap.get(currentChar) ?? 0) + 1;
      charMap.set(currentChar, currentCharCount);
      maxRepeats = Math.max(maxRepeats, currentCharCount);
      while (end - start + 1 - maxRepeats > count) {
         const formerChar = text[start];
         const formerCharCount = charMap.get(formerChar) - 1;
         if (formerCharCount === 0) {
            charMap.delete(formerChar);
         } else {
            charMap.set(formerChar, formerCharCount);
         }
         start++;
      }
      maxlen = Math.max(maxlen, end - start + 1);
      end++;
   }
   return maxlen;
}

//
// TEST
//
console.log(solution("AABABBA", 1)); // => 4
console.log(solution("CDAABCACCC", 2)); // => 4
