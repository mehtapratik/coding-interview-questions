/*
Given an array of sorted numbers, remove all duplicates from it. You should not use any extra space; 
after removing the duplicates in-place return the length of the subarray that has no duplicate in it.

Example 1:

Input: [2, 3, 3, 3, 6, 9, 9]
Output: 4
Explanation: The first four elements after removing the duplicates will be [2, 3, 6, 9].
Example 2:

Input: [2, 2, 2, 11]
Output: 2
Explanation: The first two elements after removing the duplicates will be [2, 11].
*/

// Assumptions
// 1. Array is sorted
// Constraints
// 1. Not allowed to create another copy of array or take any extra space
// O(N)T | O(1)S
const remove_duplicates = function (arr) {
   let nextUniqueNumIdx = 1;

   let i = 1;
   while (i < arr.length) {
      if (arr[i] !== arr[nextUniqueNumIdx - 1]) {
         arr[nextUniqueNumIdx] = arr[i];
         nextUniqueNumIdx++;
      }
      i++;
   }

   return nextUniqueNumIdx;
};

/*
Problem 1: Given an unsorted array of numbers and a target ‘key’, remove all instances of ‘key’ in-place and return the new length of the array.

Example 1:
Input: [3, 2, 3, 6, 3, 10, 9, 3], Key=3
Output: 4
Explanation: The first four elements after removing every 'Key' will be [2, 6, 10, 9].

Example 2:
Input: [2, 11, 2, 2, 1], Key=2
Output: 2
Explanation: The first two elements after removing every 'Key' will be [11, 1].
*/
// O(N)T | O(1)S
function remove_element(arr, key) {
   const cursor = 0;
   for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== key) {
         arr[cursor] = arr[i];
         cursor++;
      }
   }

   return cursor;
}
