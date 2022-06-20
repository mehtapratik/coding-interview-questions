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

const heap = new Heap([30, 102, 23, 17, 18, 9, 44, 12, 31], (a, b) => b - a);
heap.pop(1);
heap.print();
heap.push(39);
heap.print();
heap.pop();
heap.print();
