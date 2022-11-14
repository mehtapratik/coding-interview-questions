//
// INSTRUCTIONS
//
// Given ‘M’ sorted arrays, find the smallest range that includes at least one number from
// each of the ‘M’ lists.
//

//
// EXAMPLE
//
// Example 1:
// Input: L1=[1, 5, 8], L2=[4, 12], L3=[7, 8, 10]
// Output: [4, 7]
// Explanation: The range [4, 7] includes 5 from L1, 4 from L2 and 7 from L3.
//
// Example 2:
// Input: L1=[1, 9], L2=[4, 12], L3=[7, 10, 16]
// Output: [9, 12]
// Explanation: The range [9, 12] includes 9 from L1, 12 from L2 and 10 from L3.
//

//
// PREPARATION
//
class NumberInfo {
   constructor(number, index, array) {
      this.number = number;
      this.index = index;
      this.array = array;
   }
}

//
// CODE
//
function smallestRange(arrays) {
   const minHeap = new Heap([], null, (a, b) => b.number - a.number);
   let currentMaxNumber = -Infinity;
   for (let array of arrays) {
      minHeap.push(new NumberInfo(array[0], 0, array));
      currentMaxNumber = Math.max(array[0], currentMaxNumber);
   }

   let minNumber = 0;
   let maxNumber = Infinity;
   // we want to ensure that we have exactly M elements in heap
   // when we have less than M elements, it indicates that we
   // ran out of numbers in any one of the arrays
   while (minHeap.length === arrays.length) {
      const { number, index, array } = minHeap.pop();
      if (maxNumber - minNumber > currentMaxNumber - number) {
         minNumber = number;
         maxNumber = currentMaxNumber;
      }

      const nextIndex = index + 1;
      if (nextIndex < array.length) {
         const nextNumber = array[nextIndex];
         minHeap.push(new NumberInfo(nextNumber, nextIndex, array));
         currentMaxNumber = Math.max(nextNumber, currentMaxNumber);
      }
   }

   return [minNumber, maxNumber];
}

//
// TEST
//
console.log(
   smallestRange([
      [1, 5, 8],
      [4, 12],
      [7, 8, 10],
   ])
);
console.log(
   smallestRange([
      [1, 9],
      [4, 12],
      [7, 10, 16],
   ])
);

//
// COMPLEXITY ANALYSIS
//
// O(N * logM)T
// Since, at most, we’ll be going through all the elements of all the arrays and will
// remove / add one element in the heap in each step, the time complexity of the above
// algorithm will be O(N∗logM) where ‘N’ is the total number of elements in all the ‘M’
// input arrays.
//
// O(M)S
// The space complexity will be O(M) because, at any time, our min-heap will be store
// one number from all the ‘M’ input arrays.
//
