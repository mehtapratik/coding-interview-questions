//
// INSTRUCTIONS
//
// Given ‘M’ sorted arrays, find the K’th smallest number among all the arrays.
//

//
// EXAMPLE
//
// Example 1:
// Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5
// Output: 4
// Explanation: The 5th smallest number among all the arrays is 4, this can be verified from
// the merged list of all the arrays: [1, 2, 3, 3, 4, 6, 6, 7, 8]
//
// Example 2:
// Input: L1=[5, 8, 9], L2=[1, 7], K=3
// Output: 7
// Explanation: The 3rd smallest number among all the arrays is 7.
//

//
// CODE
//
function kthSmallestNumber(arrays, k) {
   const minHeap = new Heap([], null, (a, b) => b[0] - a[0]);

   for (let array of arrays) {
      minHeap.push([array[0], 0, array]);
   }

   let num = 0;
   let counter = 0;
   while (minHeap.length > 0) {
      const [number, i, list] = minHeap.pop();
      num = number;
      counter += 1;
      if (counter === k) {
         break;
      }

      if (list.length > i + 1) {
         minHeap.push([list[i + 1], i + 1, list]);
      }
   }

   return num;
}
//
// TEST
//
console.log(
   kthSmallestNumber(
      [
         [2, 6, 8],
         [3, 6, 7],
         [1, 3, 4],
      ],
      1
   )
);

//
// COMPLEXITY ANALYSIS
//
// O(K*logM)T
// Since we’ll be going through at most ‘K’ elements among all the arrays, and
// we will remove / add one element in the heap in each step, the time complexity
// of the above algorithm will be O(K∗logM) where ‘M’ is the total number of input arrays.
//
// O(M)S
// The space complexity will be O(M) because, at any time, our min-heap will be storing
// one number from all the ‘M’ input arrays.
//
