/*
1. A Heap is a binary tree.
2. All levels are completely filled-up before filling up next levels. Last level, if incomplete, 
   can be partially filled but it has to filled from left to right. There cannot be gaps.

         VALID HEAP
               8
            /     \
           12     23
         /   \   /   \
        17   31 30   44
      /    \
   102     18

        INVALID HEAP

               8
            /     \
           12     23
         /   \   /   \
        17   31 30   44
      /        \
     102       18

3. Heap is not a binary search tree. Left/right node does not have to be smaller/greater than parent node.
4. Heap is not a sorted arrangement of data, i.e. there is not predictable algorithm to build sorted array from heap. 
   But, it assures that the value in its peak will always be smallest/greatest.
5. Parent node of MinHeap/MaxHeap has to be smaller/greater than its child node.

Usually heaps can be built using standard array and values can be placed in array using following formula:

currentNodeIndex = i
leftNodeIndex = 2i + 1
rightNodeIndex = 2i + 2
parentNodeIndex = floor((i - 1) / 2)

Here's an example of heap array built using above mentioned valid tree. You can apply these formula
to identify parent and children:
 
 0  1    2   3   4   5   6    7   8
[8, 12, 23, 17, 31, 30, 44, 102, 18]

PSEUDO CODE
-----
1) insert/push method -> insert node at last level to the right most position. Then call siftUp method.
   siftUp method will take care of swapping the values of currently insert value with its parent nodes until
   it satisfies all heap properties (e.g. parent has to be smaller than child)
2) remove/pop method -> swap last value of the array and first value of the array. remove last 
   (former first) value of the array and then siftDown from the first (former last) value until
   it fits in the right place satisfying all heap properties (e.g. parent has to be smaller than child)
3) sift up -> find parent of current index to be siftted up. Compare current node's value with parent's. 
   it parent's value is bigger than child, then swap values. Keep sifting up (swaping parent/child) until
   the node's value is no longer greater than its parent.
4) sift down -> find both children of current node. Our of both children, identify smaller one. compare, smaller
   child's value with current node's value. If current node's value is greater, swap those values. Keep doing this
   until current node's value is no longer greater than its children.
5) build heap from raw array -> 
   1. parentNodeIndex = find parent node of the last item on the array => floor(lastItemIdx - 1 / 2)
   2. Node identified in step 1 is last parent node in the array, every node before it will always have children.
      This is due to the fact of the heap property that every level is filled completely before moving to next level.
      If last level is incomplete, it will always be filled from left to right.
   3. siftDown current parent node until it fits the right place, i.e. parent is smaller than its children
   4. Keep doing this until parentNodeIndex is >= 0
*/
function swapValues(array, i, j) {
   [array[i], array[j]] = [array[j], array[i]];

   return array;
}

class MinHeap {
   constructor(values) {
      if (Array.isArray(values) === false) {
         this.heap = [];
         return;
      }

      this.heap = values;
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
      while (parentIdx >= 0 && this.heap[parentIdx] > this.heap[currentIdx]) {
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
            this.heap[leftChildIdx] < this.heap[rightChildIdx]
         ) {
            swapIdx = leftChildIdx;
         } else {
            swapIdx = rightChildIdx;
         }

         if (this.heap[currentIndex] > this.heap[swapIdx]) {
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

   print() {
      console.log(this.heap);
   }
}

const heap = new MinHeap([30, 102, 23, 17, 18, 9, 44, 12, 31]);
heap.pop(1);
heap.print();
heap.push(1);
heap.print();
heap.pop(1);
heap.print();
