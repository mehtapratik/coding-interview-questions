//
// INSTRUCTIONS
//
// Write a function that takes a non-empty sorted arrays of integer and returns
// merged array of all those arrays.
//
// Integer in merged array has to be sorted.
//

//
// EXAMPLE
//
// input = [
//     [1, 5, 9, 21],
//     [-1, 0],
//     [-124, 81, 121],
//     [3, 6, 12, 20, 150],
//   ]
// output: [-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150]
//

//
// PREPARATION
//

function swapValues(array, i, j) {
   [array[i], array[j]] = [array[j], array[i]];

   return array;
}

class Heap {
   constructor(values, compare) {
      if (Array.isArray(values) === false) {
         this.heap = [];
         return;
      }

      this.heap = values;
      this.compare = compare;
      this.buildHeap();
   }

   // O(N)T | O(1)S
   buildHeap() {
      // finding parent of last item of array (formula: (i - 1) / 2)
      let lastParentNodeIdx = Math.floor((this.heap.length - 2) / 2);
      // Parent of the last item in array is also last parent node in array.
      // Therefore, looping backward you will be able to traverse all parent nodes
      for (let currentIdx = lastParentNodeIdx; currentIdx >= 0; currentIdx--) {
         this.siftDown(currentIdx);
      }
   }

   // O(log(n))T | O(1)S
   // Every time with sift the node up we're eliminating other half of tree (nodes in array)
   siftUp(currentIdx) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);
      while (
         parentIdx >= 0 &&
         this.compare(this.heap[parentIdx], this.heap[currentIdx]) > 0
      ) {
         swapValues(this.heap, parentIdx, currentIdx);
         currentIdx = parentIdx;
         parentIdx = Math.floor((currentIdx - 1) / 2);
      }
   }

   // O(log(n))T | O(1)S
   // Every time with sift the node down we're eliminating other half of tree (nodes in array)
   siftDown(currentIndex) {
      let leftChildIdx = 2 * currentIndex + 1;
      let rightChildIdx = 2 * currentIndex + 2;
      while (leftChildIdx <= this.heap.length - 1) {
         let swapIdx = -1;
         if (
            this.heap[rightChildIdx] == null ||
            this.compare(this.heap[leftChildIdx], this.heap[rightChildIdx]) <= 0
         ) {
            swapIdx = leftChildIdx;
         } else {
            swapIdx = rightChildIdx;
         }

         if (this.compare(this.heap[currentIndex], this.heap[swapIdx]) > 0) {
            swapValues(this.heap, currentIndex, swapIdx);
            currentIndex = swapIdx;
            leftChildIdx = 2 * currentIndex + 1;
            rightChildIdx = 2 * currentIndex + 2;
         } else {
            break;
         }
      }
   }

   // O(log(n))T | O(1)S
   // log(n) due to siftUp otherwise, it would have been O(1)T
   push(value) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
   }

   // O(log(n))T | O(1)S
   // log(n) because of siftDown otherwise, it would have been O(1)T
   pop() {
      swapValues(this.heap, 0, this.heap.length - 1);
      const removedValue = this.heap.pop();
      this.siftDown(0);
      return removedValue;
   }

   // O(1)T | O(1)S
   peek() {
      return this.heap?.[0];
   }

   length() {
      return this.heap?.length || 0;
   }

   print() {
      console.log(this.heap);
   }
}

//
// CODE
//
function mergeSortedArrays(arrays) {
   let mergedArray = [];
   let minValueStream = new Heap([], (a, b) => a.num - b.num);
   for (let i = 0; i < arrays.length; i++) {
      minValueStream.push({
         num: arrays[i][0],
         arrayIndex: i,
         elementIndex: 0,
      });
   }

   while (minValueStream.length() > 0) {
      const { num, arrayIndex, elementIndex } = minValueStream.pop();
      mergedArray.push(num);
      // we reached end of the subarray from where we just pushed the number
      if (elementIndex === arrays[arrayIndex].length - 1) {
         continue;
      } else {
         minValueStream.push({
            arrayIndex,
            elementIndex: elementIndex + 1,
            num: arrays[arrayIndex][elementIndex + 1],
         });
      }
   }

   return mergedArray;
}

//
// TEST
//

console.log(
   mergeSortedArrays([
      [0, 2],
      [1, 4],
      [4, 6],
      [0, 4],
      [7, 8],
      [9, 11],
      [3, 10],
   ])
);

console.log(
   mergeSortedArrays([
      [1, 5, 9, 21],
      [-1, 0],
      [-124, 81, 121],
      [3, 6, 12, 20, 150],
   ])
);
