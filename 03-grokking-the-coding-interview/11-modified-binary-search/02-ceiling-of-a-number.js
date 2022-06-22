//
// INSTRUCTIONS
//
// Given an array of numbers sorted in an ascending order, find the ceiling of a
// given number ‘key’. The ceiling of the ‘key’ will be the smallest element in
// the given array greater than or equal to the ‘key’.

// Write a function to return the index of the ceiling of the ‘key’. If there
// isn’t any ceiling return -1.
//

//
// EXAMPLE
//
// Input: [4, 6, 10], key = 6
// Output: 1
// Explanation: The smallest number greater than or equal to '6' is '6' having index '1'.
//
// Input: [1, 3, 8, 10, 15], key = 12
// Output: 4
// Explanation: The smallest number greater than or equal to '12' is '15' having index '4'.
//
// Input: [4, 6, 10], key = 17
// Output: -1
// Explanation: There is no number greater than or equal to '17' in the given array.
//
//Input: [4, 6, 10], key = -1
// Output: 0
// Explanation: The smallest number greater than or equal to '-1' is '4' having index '0'.
//

//
// CODE
//
const search_ceiling_of_a_number = function (arr, key) {
   let startIndex = 0;
   let endIndex = arr.length - 1;

   // If value we're searching for is well beyond the greatest value in array,
   // return -1 without performing binary search
   if (key > arr[arr.length - 1]) {
      return -1;
   }

   // At this point we know that at least one value is greater than or equal to key value
   while (startIndex <= endIndex) {
      const midIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
      const midValue = arr[midIndex];
      // if we find exact value then, we don't need to find greater value
      if (midValue === key) {
         return midIndex;
      } else if (midValue > key) {
         endIndex = midIndex - 1;
      } else {
         startIndex = midIndex + 1;
      }
   }
   // In binary search, if we don't find a value being searched...
   // 1. startIndex will be pointing to next bigger value (ceil) in the array
   // 2. endIndex will be pointing next smaller value (floor) in the array
   return startIndex;
};

//
// TEST
//
console.log(search_ceiling_of_a_number([4, 6, 10], 6));
console.log(search_ceiling_of_a_number([1, 3, 8, 10, 15], 12));
console.log(search_ceiling_of_a_number([4, 6, 10], 17));
console.log(search_ceiling_of_a_number([4, 6, 10], -1));
