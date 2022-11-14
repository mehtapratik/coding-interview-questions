//
// INSTRUCTIONS
//
// Given two sorted arrays in descending order, find ‘K’ pairs with the largest sum
// where each pair consists of numbers from both the arrays.
//

//
// EXAMPLE
//
// Example 1:
// Input: L1=[9, 8, 2], L2=[6, 3, 1], K=3
// Output: [9, 3], [9, 6], [8, 6]
// Explanation: These 3 pairs have the largest sum. No other pair has a sum larger than any of these.
//
// Example 2:
// Input: L1=[5, 2, 1], L2=[2, -1], K=3
// Output: [5, 2], [5, -1], [2, 2]
//

//
// PREPARATION
//
class NumberInfo {
   constructor(sum, nIndex, mIndex) {
      this.sum = sum;
      this.nIndex = nIndex;
      this.mIndex = mIndex;
   }
}

//
// CODE
//
function kPairsWithLargestSum(n, m, k) {
   const minHeap = new Heap([], null, (a, b) => b.sum - a.sum);

   // Since numbers are sorted in descending order we will not have to loop
   // more than K numbers in array
   for (let i = 0; i < Math.min(k, n.length); i++) {
      for (let j = 0; j < Math.min(k, m.length); j++) {
         const sum = n[i] + m[j];
         if (minHeap.length < k) {
            minHeap.push(new NumberInfo(sum, i, j));
         } else {
            // current sum is smallest than smallest number in heap.
            // you will only find smallest number going further down this path.
            // therefore, break out of this loop.
            if (sum < minHeap.peek().sum) {
               break;
            } else {
               minHeap.pop();
               minHeap.push(new NumberInfo(sum, i, j));
            }
         }
      }
   }

   return minHeap.toArray().map(function (item) {
      return [n[item.nIndex], m[item.mIndex]];
   });
}

//
// TEST
//
console.log(kPairsWithLargestSum([9, 8, 2], [6, 3, 1], 3));
console.log(kPairsWithLargestSum([5, 2, 1], [2, -1], 3));

//
// COMPLEXITY ANALYSIS
//
// O(N * M * logK)T OR O(K^2logK)T
// Since, at most, we’ll be going through all the elements of both arrays and we will add/remove one
// element in the heap in each step, the time complexity of the above algorithm will be O(N∗M∗logK)
// where ‘N’ and ‘M’ are the total number of elements in both arrays, respectively.
// If we assume that both arrays have at least ‘K’ elements then the time complexity can be
// simplified to O(K^2logK), because we are not iterating more than ‘K’ elements in both arrays.
//
// O(K)S
// The space complexity will be O(K) because, at any time, our
// MinHeap will be storing ‘K’ largest pairs.
