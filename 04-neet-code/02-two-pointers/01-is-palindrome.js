//
// INSTRUCTIONS
//
// A phrase is a palindrome if, after converting all uppercase letters into lowercase
// letters and removing all non - alphanumeric characters, it reads the same forward and
// backward. Alphanumeric characters include letters and numbers.
//
// Given a string s, return true if it is a palindrome, or false otherwise.
//

//
// EXAMPLES
//
// Put down sample inputs and expected outputs. Make sure you
// cover extremes such as null, empty, invalid sets, etc.
//Example 1:
// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
//
// Example 2:
// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
//
// Example 3:
// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

//
// CODE
//
function isPalindrome(s) {
   function isValidChar(c) {
      return /[a-zA-Z0-9]/.test(c);
   }

   let start = 0;
   let end = s.length - 1;

   while (start < end) {
      if (!isValidChar(s[start])) {
         start++;
      } else if (!isValidChar(s[end])) {
         end--;
      } else {
         if (s[start].toLowerCase() !== s[end].toLowerCase()) {
            return false;
         }
         start++;
         end--;
      }
   }
   return true;
}

//
// TEST
//
console.log(isPalindrome("A man, a plan, a canal: Panama"));
