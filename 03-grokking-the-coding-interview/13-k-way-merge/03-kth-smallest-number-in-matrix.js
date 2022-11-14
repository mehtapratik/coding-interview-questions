//
// INSTRUCTIONS
//
// Given an N∗N matrix where each row and column is sorted in ascending order,
// find the Kth smallest element in the matrix.

//
// EXAMPLE
//
// Input: Matrix=[
//     [1, 5, 9],
//     [10, 11, 13],
//     [12, 13, 15]
// ],
// K=8
// Output: 12
// Explanation: The 8th smallest number in the matrix is 13.

//
// CODE
//
function kthSmallestNumber(matrix, k) {
   const minHeap = new Heap([], null, (a, b) => b[0] - a[0]);
   for (let i = 0; i < Math.min(k, matrix.length); i++) {
      minHeap.push([matrix[i][0], matrix[i], 0]);
   }

   let count = 0;
   let number,
      list,
      index = null;
   while (minHeap.length > 0) {
      [number, list, index] = minHeap.pop();
      count += 1;
      if (count === k) {
         break;
      }

      if (index < list.length - 1) {
         minHeap.push([list[index + 1], list, index + 1]);
      }
   }

   if (count !== k) {
      return null;
   }
   return number;
}

//
// TEST
//
console.log(
   kthSmallestNumber(
      [
         [1, 5, 9],
         [10, 11, 13],
         [12, 13, 15],
      ],
      8
   )
);

//
// COMPLEXITY ANALYSIS
//
// O(min(K, N) + K*logN)T
// First, we inserted at most ‘K’ or one element from each of the ‘N’ rows, which will take O(min(K, N)).
// Then we went through at most ‘K’ elements in the matrix and remove / add one element in the heap in
// each step. As we can’t have more than ‘N’ elements in the heap in any condition, therefore, the
// overall time complexity of the above algorithm will be O(min(K,N)+K∗logN).
//
// O(N)S
// The space complexity will be O(N) because, in the worst case, our min-heap will be storing
// one number from each of the ‘N’ rows.
//
