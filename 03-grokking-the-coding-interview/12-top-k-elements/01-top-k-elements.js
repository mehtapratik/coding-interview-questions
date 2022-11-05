//
// INSTRUCTIONS
//
// Given an unsorted array of numbers, find the ‘K’ largest numbers in it.
//

//
// EXAMPLE
//
// Example 1:
//
// Input: [3, 1, 5, 12, 2, 11], K = 3
// Output: [5, 12, 11]
// Example 2:
//
// Input: [5, 12, 11, -1, 12], K = 3
// Output: [12, 11, 12]
//

//
// CODE
//
const find_k_largest_numbers = function (nums, k) {
   const minHeap = new Heap([], null, (a, b) => b - a);
   for (let num of nums) {
      if (minHeap.length < k) {
         minHeap.push(num);
      } else if (minHeap.peek() < num) {
         minHeap.pop();
         minHeap.push(num);
      }
   }
   return minHeap.toArray();
};

//
// TEST
//

console.log(
   `Here are the top K numbers: ${find_k_largest_numbers(
      [3, 1, 5, 12, 2, 11],
      3
   )}`
);
console.log(
   `Here are the top K numbers: ${find_k_largest_numbers(
      [5, 12, 11, -1, 12],
      3
   )}`
);

//
// COMPLEXITY ANALYSIS
//
// The time complexity of this algorithm is O(N * logK).
//
// The space complexity will be O(k) since we need to store the top ‘K’ numbers in the heap.
//
