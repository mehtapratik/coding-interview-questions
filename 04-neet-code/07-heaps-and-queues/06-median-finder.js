//
// INSTRUCTIONS
//
// The median is the middle value in an ordered integer list. If the size of the list is
// even, there is no middle value, and the median is the mean of the two middle values.
//
// For example, for arr = [2,3,4], the median is 3.
// For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
//
// Implement the MedianFinder class:
// MedianFinder() initializes the MedianFinder object.
// void addNum(int num) adds the integer num from the data stream to the data structure.
// double findMedian() returns the median of all elements so far.
//

//
// EXAMPLES
//
// const medians = new MedianFinder();
// medians.addNum(1);
// medians.addNum(2);
// medians.findMedian(); -> 1.5
// medians.addNum(3);
// medians.findMedian(); -> 2.0

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

   // O(1)T | O(1)S
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
var MedianFinder = function () {
   this.minHeap = new Heap([], (a, b) => a - b); // bigger half
   this.maxHeap = new Heap([], (a, b) => b - a); // smaller half
};

MedianFinder.prototype.addNum = function (num) {
   if (this.maxHeap.length() === 0) {
      this.maxHeap.push(num);
      return;
   }

   if (this.maxHeap.peek() > num) {
      this.minHeap.push(this.maxHeap.pop());
      this.maxHeap.push(num);
   } else {
      this.minHeap.push(num);
   }

   if (this.minHeap.length() - this.maxHeap.length() > 1) {
      this.maxHeap.push(this.minHeap.pop());
   }
};

MedianFinder.prototype.findMedian = function () {
   const len = this.minHeap.length() + this.maxHeap.length();
   if (len % 2 === 1) {
      return this.minHeap.peek() ?? this.maxHeap.peek();
   }

   return (this.minHeap.peek() + this.maxHeap.peek()) / 2;
};

//
// TEST
//
const medians = new MedianFinder();
medians.addNum(1);
medians.addNum(2);
console.log(medians.findMedian());
medians.addNum(3);
console.log(medians.findMedian());
