/*
   Write a function that takes two strings, s1 and s2
   and returns the longest common subsequence of s1 and s2

   ˜"ABAZDC", "BACBAD" => "ABAD"
   "AGGTAB", "GXTXAYB" => "GTAB"
   "aaaa", "aa" => "aa"
   "", "..." => ""
   "ABBA", "ABCABA" => "ABBA"
*/
function longestSubstring(s1, s2) {
   if (s1.length === 0 || s2.length === 0) return "";
   const matrix = new Array(s1.length)
      .fill()
      .map((row) => new Array(s2.length).fill(null));
   const results = _longestSubstring(s1, s2, 0, [], matrix);

   return results.join("");
}

function _longestSubstring(
   shortString,
   longString,
   fromIndex,
   results,
   matrix
) {
   if (fromIndex >= shortString.length) return results;
   let cursor = -1;
   let result = [];
   for (let i = fromIndex; i < shortString.length; i++) {
      const currentChar = shortString[i];
      console.log(matrix[i][cursor + 1]);
      if (matrix[i][cursor + 1]) {
         console.log(
            `Serving ${currentChar} from cache[${i}, ${cursor + 1}]; found ${
               matrix[i][cursor + 1]
            }.`
         );
         result.push(matrix[i][cursor + 1]);
         continue;
      }
      let foundAt = longString.indexOf(currentChar, cursor + 1);
      if (foundAt > -1) {
         matrix[i][cursor + 1] = currentChar;
         console.log(`Saving ${currentChar} to cache[${i}, ${cursor + 1}].`);
         cursor = foundAt;
         result.push(currentChar);
      }
   }

   results = result.length > results.length ? result : results;
   return _longestSubstring(
      shortString,
      longString,
      fromIndex + 1,
      results,
      matrix
   );
}

console.log(longestSubstring("AGGTAB", "GXTXAYB"));
