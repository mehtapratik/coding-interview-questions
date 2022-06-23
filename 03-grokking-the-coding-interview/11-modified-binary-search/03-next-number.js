//
// INSTRUCTIONS
//
// Given an array of lowercase letters sorted in ascending order, find the smallest letter
// in the given array greater than a given ‘key’.
//
// Assume the given array is a circular list, which means that the last letter is assumed
// to be connected with the first letter.This also means that the smallest letter in the
// given array is greater than the last letter of the array and is also the first letter
// of the array.
//
// Write a function to return the next letter of the given ‘key’.
//

//
// EXAMPLE
//
// Input: ['a', 'c', 'f', 'h'], key = 'f'
// Output: 'h'
// Explanation: The smallest letter greater than 'f' is 'h' in the given array.
//
// Input: ['a', 'c', 'f', 'h'], key = 'b'
// Output: 'c'
// Explanation: The smallest letter greater than 'b' is 'c'.
//
// Input: ['a', 'c', 'f', 'h'], key = 'm'
// Output: 'a'
// Explanation: As the array is assumed to be circular, the smallest letter greater than 'm' is 'a'.
//
// Input: ['a', 'c', 'f', 'h'], key = 'h'
// Output: 'a'
// Explanation: As the array is assumed to be circular, the smallest letter greater than 'h' is 'a'.

//
// CODE
//
const search_next_letter = function (letters, key) {
   const LEN = letters.length;
   let start = 0;
   let end = LEN - 1;

   while (start <= end) {
      const mid = Math.floor(start + (end - start) / 2);
      // TIPS: Letters can be compared like numbers in JS based on their ascii value;
      // therefore, b > a.
      if (letters[mid] <= key) {
         start = mid + 1;
      } else {
         end = mid - 1;
      }
   }

   return letters[start % LEN];
};

//
// TEST
//
console.log(search_next_letter(["a", "c", "f", "h"], "f"));
console.log(search_next_letter(["a", "c", "f", "h"], "b"));
console.log(search_next_letter(["a", "c", "f", "h"], "m"));
console.log(search_next_letter(["a", "c", "f", "h"], "h"));
