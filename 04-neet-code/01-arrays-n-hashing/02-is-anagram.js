//
// INSTRUCTIONS
//
// An Anagram is a word or phrase formed by rearranging the letters of a different word
// or phrase, typically using all the original letters exactly once.
//

//
// EXAMPLES
//
// Example 1:
// Input: s = "anagram", t = "nagaram"
// Output: true
//
// Example 2:
// Input: s = "rat", t = "car"
// Output: false
//

//
// CODE
//
var isAnagram = function (s, t) {
   if (typeof s !== "string" || typeof t !== "string") {
      return false;
   }

   if (s.length !== t.length) {
      return false;
   }
   const map = new Map();

   for (let char of s) {
      const count = map.get(char) ?? 0;
      map.set(char, count + 1);
   }

   for (let char of t) {
      if (map.has(char) === false) {
         return false;
      }
      const count = map.get(char);
      if (count === 1) {
         map.delete(char);
      } else {
         map.set(char, count - 1);
      }
   }

   return map.size === 0;
};

var isAnagram = function (s, t) {
   if (typeof s !== "string" || typeof t !== "string") {
      return false;
   }

   if (s.length !== t.length) {
      return false;
   }

   const sa = s.split("").sort((a, b) => a.localeCompare(b));
   const ta = t.split("").sort((a, b) => a.localeCompare(b));

   for (let i = 0; i < sa.length; i++) {
      if (sa[i] !== ta[i]) {
         return false;
      }
   }

   return true;
};
