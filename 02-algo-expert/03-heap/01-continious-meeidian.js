//
// INSTRUCTIONS
//
// Design a class to calculate the median of a number stream. The class should have the following two methods:
//
// 1. insertNum(int num): stores the number in the class
// 2. findMedian(): returns the median of all numbers inserted in the class
//
// If the count of numbers inserted in the class is even, the median will be the average of the middle two numbers.
//

//
// EXAMPLE
//
// 1. insertNum(3)
// 2. insertNum(1)
// 3. findMedian() -> output: 2
// 4. insertNum(5)
// 5. findMedian() -> output: 3
// 6. insertNum(4)
// 7. findMedian() -> output: 3.5
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

class ContinuousMedianHandler {
   constructor() {
      // Write your code here.
      this.median = null;
      this.min = new Heap([], (a, b) => a - b);
      this.max = new Heap([], (a, b) => b - a);
   }

   insert(number) {
      if (this.max.length() === 0 || this.max.peek() >= number) {
         // push the smaller half of the number in max heap
         this.max.push(number);
      } else {
         // push the greater half ot the number in min heap
         this.min.push(number);
      }

      // When you have the odd number of elements in stream, you want to
      // consider maximum value of the lower half. Otherwise,
      // (max value of lower half + min value of lower half) / 2.
      // To support odd number scenario, you can allow max heap to have
      // exactly one more element than min heap
      if (this.max.length() > this.min.length() + 1) {
         this.min.push(this.max.pop());
      } else if (this.min.length() > this.max.length()) {
         this.max.push(this.min.pop());
      }

      if (this.max.length() === this.min.length()) {
         this.median = (this.max.peek() + this.min.peek()) / 2;
      } else {
         this.median = this.max.peek();
      }

      return;
   }

   getMedian() {
      return this.median;
   }
}

//
// TEST
//

var medianOfAStream = new ContinuousMedianHandler();
medianOfAStream.insert(3);
medianOfAStream.insert(1);
console.log(`The median is: ${medianOfAStream.getMedian()}`);
medianOfAStream.insert(5);
console.log(`The median is: ${medianOfAStream.getMedian()}`);
medianOfAStream.insert(4);
console.log(`The median is: ${medianOfAStream.getMedian()}`);
