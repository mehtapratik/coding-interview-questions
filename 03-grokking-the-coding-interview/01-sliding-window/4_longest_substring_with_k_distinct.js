/*
Given a string, find the length of the longest substring in it with no more than K distinct characters.

Input: String="araaci", K=2
Output: 4
Explanation: The longest substring with no more than '2' distinct characters is "araa".

Input: String="cbbebi", K=3
Output: 5
Explanation: The longest substrings with no more than '3' distinct characters are "cbbeb" & "bbebi".

Input: String="cbbebi", K=10
Output: 6
Explanation: The longest substring with no more than '10' distinct characters is "cbbebi".
*/
const longest_substring_with_k_distinct = function (str, k) {
   if (k >= str.length) return str.length;
   let windowStart = 0;
   const charMap = {};
   let matches = 0;
   let longestString = -Infinity;

   for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
      const currentChar = str[windowEnd];
      if (!(currentChar in charMap)) {
         charMap[currentChar] = 0;
         matches++;
      }
      charMap[currentChar]++;

      // shrinking the window until number of unique characters are less
      // than or equal to K
      while (matches > k) {
         const formerChar = str[windowStart];
         charMap[formerChar]--;
         windowStart++;
         if (charMap[formerChar] === 0) {
            matches--;
         }
      }

      // +1 is to include from index in length (so, the
      // characters from 4 - 0 are actually 5 character long string)
      longestString = Math.max(longestString, windowEnd - windowStart + 1);
   }
   return longestString;
};

/*
Time Complexity
The above algorithm’s time complexity will be  O(N), where N is the number of characters in the input string. The outer for 
loop runs for all characters, and the inner while loop processes each character only once; therefore, the time complexity of 
the algorithm will be O(N+N), which is asymptotically equivalent to O(N).

Space Complexity
The algorithm’s space complexity is O(K), as we will be storing a maximum of K+1 characters in the HashMap.
*/
