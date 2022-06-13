/*
Given a string with lowercase letters only, if you are allowed to replace no more than k letters with any letter, 
find the length of the longest substring having the same letters after replacement.

Example 1:
Input: String="aabccbb", k=2
Output: 5
Explanation: Replace the two 'c' with 'b' to have the longest repeating substring "bbbbb".

Example 2:
Input: String="abbcb", k=1
Output: 4
Explanation: Replace the 'c' with 'b' to have the longest repeating substring "bbbb".

Example 3:
Input: String="abccde", k=1
Output: 3
Explanation: Replace the 'b' or 'd' with 'c' to have the longest repeating substring "ccc".
*/

/*
aabccbb, 2  -> 5 (bccbb)
abbcb, 1    -> 4 (bbcb)
"", x       -> 0 ('')
aabccbb, 0  -> 2 (aa, cc, bb)
abccde, 1   -> 3 (bcc)


    |
a a b c c b b
            |
start             end         map                     repeated         max         
0                 0           {a: 1}                  1 (a)            1
0                 1           {a: 2}                  2 (a)            2
0                 2           {a: 2, b: 1}            2 (a)            3
0                 3           {a: 2, b: 1, c:1}       2 (a)            4
0                 4           {a: 2, b: 1, c:2}       2 (a) 
                              if (end - start + 1 - repeated > k) 
                              former
                              a
1                 4           {a: 1, b:1, c: 2}       2 (a)            4
1                 5           {a: 1, b:2, c: 2}       2 (b)            4
                        if (6 - 2 + 1 - 3 > 2) 
                              former
                              a
2                 5           {b: 2, c:2}             2 (b)            4
2                 6           {b: 3, c:2}             3 (b)            5

<-| 5
*/

// O(N)T | O(C)S
const length_of_longest_substring = function (str, k) {
   let windowStart = 0;
   let maxRepeatCharCount = 0;
   let longestLength = 0;
   const charFreq = {};

   for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
      const currentChar = str[windowEnd];
      if (!(currentChar in charFreq)) charFreq[currentChar] = 0;
      charFreq[currentChar]++;
      maxRepeatCharCount = Math.max(maxRepeatCharCount, charFreq[currentChar]);

      if (windowEnd - windowStart + 1 - maxRepeatCharCount > k) {
         const formerChar = str[windowStart];
         windowStart++;
         charFreq[formerChar]--;
         if (charFreq[formerChar] === 0) delete charFreq[formerChar];
      }

      longestLength = Math.max(longestLength, windowEnd - windowStart + 1);
   }

   return longestLength;
};

console.log(length_of_longest_substring("aabccbb", 2));

// Another method that you came up with
const length_of_longest_substring = function (str, k) {
   let seriesChar = null;
   let seriesFrom = 0;
   let longestSubstring = 0;
   for (let seriesTo = 0; seriesTo < str.length; seriesTo++) {
      // Find next character in series from seriesTo to seriesTo + K characters.
      // If current series character (seriesChar) is found, than series will not be broken and it will continue
      // If current series character is not not found, first non series character and its index will be returned
      // to identify new longest possible series
      let [nextChar, nextCharIdx] = findNextChar(
         str,
         seriesChar,
         seriesFrom,
         seriesTo,
         seriesTo + k
      );
      longestSubstring = Math.max(longestSubstring, seriesTo - seriesFrom + 1);
      if (nextChar !== seriesChar) {
         seriesChar = nextChar;
         seriesFrom = nextCharIdx;
         seriesTo = nextCharIdx;
      }
   }
   return longestSubstring;
};

function findNextChar(inputString, seriesChar, seriesFrom, findFrom, findTo) {
   let newSeries = null;
   for (let i = findFrom; i <= findTo; i++) {
      if (inputString[i] === seriesChar) {
         return [seriesChar, seriesFrom];
      } else if (newSeries === null) {
         newSeries = [inputString[i], i];
      }
   }

   return newSeries;
}
