//
// INSTRUCTIONS
//
// Given an array of strings strs, group the anagrams together. You can return the answer in any order.
//
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
// typically using all the original letters exactly once.
//

//
// EXAMPLES
//
// Example 1:
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
//
// Example 2:
// Input: strs = [""]
// Output: [[""]]
//
// Example 3:
// Input: strs = ["a"]
// Output: [["a"]]
//

//
// CODE
//

// O(N * KlogK)T | O(N * K)S
function groupAnagrams(words) {
   const map = new Map();
   for (let word of words) {
      const hash = buildHash(word);
      const wordsWithSameHash = map.get(hash) ?? [];
      wordsWithSameHash.push(word);
      map.set(hash, wordsWithSameHash);
   }

   return [...map.values()];

   function buildHash(originalStr) {
      return originalStr
         .split("")
         .sort((a, b) => a.localeCompare(b))
         .join("");
      // const hash = [];
      // for (let char of str) {
      //    hash[char.charCodeAt(0)] = (hash[char.charCodeAt(0)] || 0) + 1;
      // }

      // const values = Object.entries(hash);
      // values.sort((a, b) => Number(a.key) - Number(b.key));
      // return values
      //    .reduce((pv, cv) => {
      //       pv.push(`_${cv.toString()}_`);
      //       return pv;
      //    }, [])
      //    .join("");
   }
}

//
// TEST
//
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
