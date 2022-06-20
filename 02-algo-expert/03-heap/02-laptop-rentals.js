//
// INSTRUCTIONS
//
// You're given a list of time intervals during which students can rent school laptops.
// These intervals are represented by pair integers [start, end].
//
// No two students can use a laptop at the same time, but can be used immediately after.
//
// Write a function that returns the minimum number of laptops that the school needs to rent
// such that students will always have access to a laptop when they need one.

//
// EXAMPLE
//
// input = [
//    [0, 2],
//    [1, 4],
//    [4, 6],
//    [0, 4],
//    [7, 8],
//    [9, 11],
//    [3, 10],
// ];
// output: 3
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
function laptopRentals(times) {
   times.sort((a, b) => a[0] - b[0]);

   const endTimeHeap = new Heap([], (a, b) => a[1] - b[1]);

   let minLaptops = 0;

   for (let time of times) {
      const [start, _] = time;

      while (endTimeHeap.length() > 0 && endTimeHeap.peek()[1] <= start) {
         endTimeHeap.pop();
      }

      endTimeHeap.push(time);
      minLaptops = Math.max(minLaptops, endTimeHeap.length());
   }

   return minLaptops;
}

//
// TEST
//

console.log(
   laptopRentals([
      [0, 2],
      [1, 4],
      [4, 6],
      [0, 4],
      [7, 8],
      [9, 11],
      [3, 10],
   ])
);
