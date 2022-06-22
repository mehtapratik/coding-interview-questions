//
// INSTRUCTIONS
//
// Given a sorted array of numbers, find if a given number ‘key’ is present in the array.
// Though we know that the array is sorted, we don’t know if it’s sorted in ascending or
// descending order.You should assume that the array can have duplicates.

// Write a function to return the index of the ‘key’ if it is present in the array,
// otherwise return -1.
//

//
// EXAMPLE
//
// Input: [4, 6, 10], key = 10
// Output: 2
//
// Input: [1, 2, 3, 4, 5, 6, 7], key = 5
// Output: 4
//
// Input: [10, 6, 4], key = 4
// Output: 2
//

//
// CODE
//
// O(log(n))T | O(1)S
const binary_search = function (arr, key) {
   let startIndex = 0;
   let endIndex = arr.length - 1;

   const isAscending = arr[start] < arr[end];

   while (startIndex <= endIndex) {
      // You could just do (startIndex + endIndex) / 2 but that may result in integer
      // overflow situations in languages like Java. Therefore, it is advisable to
      // divide (endIndex - startIndex) / 2 and then add it to startIndex to
      // have the same effect
      const midIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
      const midValue = arr[midIndex];

      if (midValue === key) {
         return midIndex;
      } else if (midValue < key) {
         if (isAscending) {
            startIndex = midIndex + 1;
         } else {
            endIndex = midIndex - 1;
         }
      } else {
         if (isAscending) {
            endIndex = midIndex - 1;
         } else {
            startIndex = midIndex + 1;
         }
      }
   }

   return -1;
};

//
// TEST
//
console.log(binary_search([4, 6, 10], 10));
console.log(binary_search([1, 2, 3, 4, 5, 6, 7], 5));
console.log(binary_search([10, 6, 4], 10));
console.log(binary_search([10, 6, 4], 4));
