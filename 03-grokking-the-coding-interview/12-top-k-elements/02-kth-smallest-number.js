//
// INSTRUCTIONS
//
// Given an unsorted array of numbers, find Kth smallest number in it.
//
// Please note that it is the Kth smallest number in the sorted order, not the Kth distinct element.
//

//
// EXAMPLE
//
// Example 1:
// Input: [1, 5, 12, 2, 11, 5], K = 3
// Output: 5
// Explanation: The 3rd smallest number is '5', as the first two smaller numbers are [1, 2].
//
// Example 2:
// Input: [1, 5, 12, 2, 11, 5], K = 4
// Output: 5
// Explanation: The 4th smallest number is '5', as the first three small numbers are [1, 2, 5].
//
// Input: [5, 12, 11, -1, 12], K = 3
// Output: 11
// Explanation: The 3rd smallest number is '11', as the first two small numbers are [5, -1].
//

//
// CODE
//
const find_Kth_smallest_number = function (nums, k) {
   const maxHeap = new Heap([], null, (a, b) => a - b);

   for (let num of nums) {
      if (maxHeap.length < k) {
         maxHeap.push(num);
      } else if (maxHeap.peek() > num) {
         maxHeap.pop();
         maxHeap.push(num);
      }
   }
   return maxHeap.peek();
};

//
// TEST
//
console.log(
   `Kth smallest number is: ${find_Kth_smallest_number(
      [1, 5, 12, 2, 11, 5],
      3
   )}`
);
// since there are two 5s in the input array, our 3rd and 4th smallest numbers should be a '5'
console.log(
   `Kth smallest number is: ${find_Kth_smallest_number(
      [1, 5, 12, 2, 11, 5],
      5
   )}`
);
console.log(
   `Kth smallest number is: ${find_Kth_smallest_number([2, 2, 11, -1, 12], 3)}`
);

//
// COMPLEXITY ANALYSIS
//
// The time complexity of this algorithm is O(N * logK).
//
// The space complexity will be O(k) since we need to store the top ‘K’ numbers in the heap.
//
