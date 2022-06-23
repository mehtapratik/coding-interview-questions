//
// INSTRUCTIONS
//
// Given an infinite sorted array (or an array with unknown size), find if a given number ‘key’
// is present in the array.Write a function to return the index of the ‘key’ if it is present
// in the array, otherwise return -1.
//
// Since it is not possible to define an array with infinite (unknown) size, you will be provided
// with an interface ArrayReader to read elements of the array.ArrayReader.get(index) will return
// the number at index; if the array’s size is smaller than the index, it will return Integer.MAX_VALUE.
//

//
// EXAMPLE
//
// Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 16
// Output: 6
// Explanation: The key is present at index '6' in the array.
//
// Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 11
// Output: -1
// Explanation: The key is not present in the array.
//
// Input: [1, 3, 8, 10, 15], key = 15
// Output: 4
// Explanation: The key is present at index '4' in the array.
//
// Input: [1, 3, 8, 10, 15], key = 200
// Output: -1
// Explanation: The key is not present in the array.
//

//
// PREPARATION
//
class ArrayReader {
   constructor(arr) {
      this.arr = arr;
   }

   get(index) {
      if (index >= this.arr.length) return Number.MAX_SAFE_INTEGER;
      return this.arr[index];
   }
}

//
// CODE
//
const search_in_infinite_array = function (reader, key) {
   // Identify start and end bound within which key can found
   let start = 0;
   let end = 1;

   while (reader.get(end) < key) {
      const newStart = end + 1;
      end = (end - start + 1) * 2;
      start = newStart;
   }

   // once bounds are identified, do standard binary search
   while (start <= end) {
      const mid = Math.floor(start + (end - start) / 2);
      const midVal = reader.get(mid);

      if (midVal === key) {
         return mid;
      } else if (midVal < key) {
         start = mid + 1;
      } else {
         end = mid - 1;
      }
   }
   return -1;
};

//
// TEST
//
var reader = new ArrayReader([
   4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
]);
console.log(search_in_infinite_array(reader, 16));
console.log(search_in_infinite_array(reader, 11));
reader = new ArrayReader([1, 3, 8, 10, 15]);
console.log(search_in_infinite_array(reader, 15));
console.log(search_in_infinite_array(reader, 200));
