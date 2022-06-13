/*
Given a string and a pattern, find out if the string contains any permutation of the pattern.

Permutation is defined as the re-arranging of the characters of the string. For example, “abc” has the following six permutations:

abc
acb
bac
bca
cab
cba
If a string has ‘n’ distinct characters, it will have n! permutations.

Example 1:
Input: String="oidbcaf", Pattern="abc"
Output: true
Explanation: The string contains "bca" which is a permutation of the given pattern.

Example 2:
Input: String="odicf", Pattern="dc"
Output: false
Explanation: No permutation of the pattern is present in the given string as a substring.

Example 3:
Input: String="bcdxabcdy", Pattern="bcdyabcdx"
Output: true
Explanation: Both the string and the pattern are a permutation of each other.

Example 4:
Input: String="aaacb", Pattern="abc"
Output: true
Explanation: The string contains "acb" which is a permutation of the given pattern.
*/

/*
"oadicf", "dc"   -> false
"oidbcaf", "abc" -> true
"oidbcaf", "xyz" -> false

       |
"o a d i c f", "d c"   -> false
         |
start       end         hash                 matches
0           0           {d: 1, c: 1}         0
0           1           -                    0
1           2           {d: 0, c: 1}         1
2           3           {d: 0, c: 1}         1
            3 - 2 + 1 === 2
                  former = startChar -> d
                        {d:1, c: 1}          0
      

hash

*/

// pattern - m 1S 1T
// str - n  1T
const find_permutation = function (str, pattern) {
   // If pattern is longer than source string, return false without further check
   if (pattern.length > str.length) return false;
   // return true for empty patternempty pattern
   if (!pattern || pattern.length === 0) return true;

   const patternMap = {};
   for (let char of pattern) {
      if (!(char in patternMap)) patternMap[char] = 0;
      patternMap[char]++;
   }

   let uniqueCharsInPattern = Object.keys(patternMap).length;
   let matchCount = 0;
   let windowStart = 0;

   for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
      const currentChar = str[windowEnd];
      if (currentChar in patternMap) {
         patternMap[currentChar]--;
         if (patternMap[currentChar] === 0) {
            matchCount++;
            if (matchCount === uniqueCharsInPattern) return true;
         }
      }

      if (windowEnd - windowStart + 1 === pattern.length) {
         const formerChar = str[windowStart];
         if (formerChar in patternMap) patternMap[formerChar]++;
         if (patternMap[formerChar] > 0) matchCount--;
         windowStart++;
      }
   }

   return false;
};

console.log(find_permutation("abcdefg", "edc"));
