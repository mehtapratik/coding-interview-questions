/*
Given a string and a pattern, find the smallest substring in the given string which has all the characters of the given pattern.

Example 1:
Input: String="aabdec", Pattern="abc"
Output: "abdec"
Explanation: The smallest substring having all characters of the pattern is "abdec"

Example 2:
Input: String="abdbca", Pattern="abc"
Output: "bca"
Explanation: The smallest substring having all characters of the pattern is "bca".

Example 3:
Input: String="adcad", Pattern="abc"
Output: ""
Explanation: No substring in the given string has all characters of the pattern.
*/

/*
       |
"a b d b c a", "abc" -> bca
           |

uniqueCharLength = 3
                                             {a:1, b:1, c:1}
begin                   end                  hash                       matches              Infinity    
0                       0                    {a0, b1, c1}               1
0                       1                    {a0, b0, c1}               2
0                       2                    -                          2
0                       3                    a0, b-1, c1                2
0                       4                    a0, b-1, c0                3                 4 - 0 + 1 -> 5    
                                       while(matches === uniqueCharLength)
                                             min (minLength, 4-0+1)                       5
                                             a
 1                      4                    a1, b-1, c1                2                 5
 1                      5                    a0, b-1, c0                3                 5
                                       while(matches === uniqueCharLength)
                                            min (minLength, 5-1+1)         
                                            b {a:0 b:0, c:0}
*/
const find_substring = function (str, pattern) {
   const patternMap = {};
   for (let char of pattern) {
      if (!(char in patternMap)) patternMap[char] = 0;
      patternMap[char]++;
   }

   const UNIQUE_CHARS_IN_PATTERN = Object.keys(patternMap).length;

   let shortestLength = Infinity;
   let shortLengtStartIndex = -1;
   let windowStart = 0;
   let matchCount = 0;

   for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
      const currentChar = str[windowEnd];
      if (currentChar in patternMap) {
         patternMap[currentChar]--;
         if (patternMap[currentChar] === 0) matchCount++;
      }

      while (matchCount === UNIQUE_CHARS_IN_PATTERN) {
         const currentLength = windowEnd - windowStart + 1;
         if (shortestLength > currentLength) {
            shortLengtStartIndex = windowStart;
            shortestLength = currentLength;
         }
         const formerChar = str[windowStart];
         windowStart++;
         if (formerChar in patternMap) patternMap[formerChar]++;
         if (patternMap[formerChar] > 0) matchCount--;
      }
   }

   console.log(shortLengtStartIndex, shortestLength);
   return shortestLength === Infinity
      ? ""
      : str.substring(
           shortLengtStartIndex,
           shortLengtStartIndex + shortestLength
        );
};

console.log(find_substring("abdbca", "abc"));
console.log(find_substring("adcad", "ada"));
